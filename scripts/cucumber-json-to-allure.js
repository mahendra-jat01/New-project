const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const cucumberJsonPath = path.join(projectRoot, "reports", "cucumber-report.json");
const allureResultsDir = path.join(projectRoot, "allure-results");

const statusMap = {
  passed: "passed",
  failed: "failed",
  skipped: "skipped",
  pending: "skipped",
  undefined: "broken",
  ambiguous: "broken"
};

function nsToMs(value) {
  return Math.round(Number(value || 0) / 1000000);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

function md5(value) {
  return crypto.createHash("md5").update(value).digest("hex");
}

function normalizeStatus(status) {
  return statusMap[status] || "broken";
}

function extensionForMime(mimeType) {
  if (mimeType === "image/png") {
    return "png";
  }
  if (mimeType === "video/webm") {
    return "webm";
  }
  if (mimeType === "text/plain") {
    return "txt";
  }
  return "attach";
}

function getScenarioStatus(steps) {
  const failedStep = steps.find((step) => step.result?.status === "failed");
  const brokenStep = steps.find((step) => ["undefined", "ambiguous"].includes(step.result?.status));
  const skippedStep = steps.find((step) => ["skipped", "pending"].includes(step.result?.status));

  return normalizeStatus(failedStep?.result?.status || brokenStep?.result?.status || skippedStep?.result?.status || "passed");
}

function convert() {
  if (!fs.existsSync(cucumberJsonPath)) {
    console.warn(`Cucumber JSON report not found: ${cucumberJsonPath}`);
    return 0;
  }

  fs.rmSync(allureResultsDir, { recursive: true, force: true });
  fs.mkdirSync(allureResultsDir, { recursive: true });

  const features = readJson(cucumberJsonPath);
  let resultCount = 0;
  let runElapsed = 0;
  const runStart = Date.now();

  for (const feature of features) {
    for (const scenario of feature.elements || []) {
      if (scenario.type !== "scenario") {
        continue;
      }

      const uuid = crypto.randomUUID();
      let elapsed = 0;
      const attachments = [];
      const steps = [];
      const labels = [
        { name: "framework", value: "cucumberjs" },
        { name: "language", value: "javascript" },
        { name: "feature", value: feature.name }
      ];

      for (const tag of [...(feature.tags || []), ...(scenario.tags || [])]) {
        labels.push({ name: "tag", value: tag.name });
      }

      for (const step of scenario.steps || []) {
        const stepDuration = nsToMs(step.result?.duration);
        const start = elapsed;
        elapsed += stepDuration;

        for (const embedding of step.embeddings || []) {
          const mimeType = embedding.mime_type || embedding.mimeType || "text/plain";
          const extension = extensionForMime(mimeType);
          const source = `${crypto.randomUUID()}-attachment.${extension}`;
          fs.writeFileSync(path.join(allureResultsDir, source), Buffer.from(embedding.data, "base64"));
          attachments.push({
            name: extension === "png" ? "Screenshot" : extension === "webm" ? "Video" : "Attachment",
            source,
            type: mimeType
          });
        }

        if (step.hidden) {
          continue;
        }

        const convertedStep = {
          name: `${step.keyword || ""}${step.name || "hook"}`.trim(),
          status: normalizeStatus(step.result?.status),
          stage: "finished",
          start,
          stop: elapsed
        };

        if (step.result?.error_message) {
          convertedStep.statusDetails = {
            message: step.result.error_message,
            trace: step.result.error_message
          };
        }

        steps.push(convertedStep);
      }

      const fullName = `${feature.uri || feature.name}#${scenario.name}`;
      const scenarioStart = runStart + runElapsed;
      const scenarioStop = scenarioStart + elapsed;
      runElapsed += elapsed;

      const result = {
        uuid,
        historyId: md5(fullName),
        testCaseId: md5(fullName),
        name: scenario.name,
        fullName,
        status: getScenarioStatus(scenario.steps || []),
        stage: "finished",
        labels,
        links: [],
        parameters: [],
        steps,
        attachments,
        start: scenarioStart,
        stop: scenarioStop
      };

      const failedStep = (scenario.steps || []).find((step) => step.result?.error_message);
      if (failedStep) {
        result.statusDetails = {
          message: failedStep.result.error_message,
          trace: failedStep.result.error_message
        };
      }

      writeJson(path.join(allureResultsDir, `${uuid}-result.json`), result);
      resultCount += 1;
    }
  }

  console.log(`Converted ${resultCount} Cucumber scenario(s) to Allure results.`);
  return resultCount;
}

convert();
