const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const reportsDir = path.join(__dirname, "reports");
const allureResultsDir = path.join(__dirname, "allure-results");
const allureReportDir = path.join(__dirname, "allure-report");

for (const dir of [reportsDir, allureResultsDir, path.join(__dirname, "test-results", "screenshots")]) {
  fs.mkdirSync(dir, { recursive: true });
}

const cucumberArgs = [
  "--format",
  "html:reports/cucumber-report.html",
  "--format",
  "json:reports/cucumber-report.json",
  "--format",
  "allure-cucumberjs/reporter",
  "--format-options",
  JSON.stringify({ resultsDir: "allure-results" }),
  "--format",
  "summary"
];

if (args.includes("--headed")) {
  process.env.HEADLESS = "false";
}

const tagsIndex = args.indexOf("--tags");
if (tagsIndex !== -1 && args[tagsIndex + 1]) {
  cucumberArgs.push("--tags", args[tagsIndex + 1]);
}

const nameIndex = args.indexOf("--name");
if (nameIndex !== -1 && args[nameIndex + 1]) {
  cucumberArgs.push("--name", args[nameIndex + 1]);
}

// Invoke the local Cucumber CLI directly through Node. On Windows, spawning
// `npx.cmd` (a .cmd file) with spawnSync fails with EINVAL, so we bypass the
// .cmd shim entirely and run node <bin> instead - this is robust on all OSes.
const cucumberBin = path.join(
  __dirname,
  "node_modules",
  "@cucumber",
  "cucumber",
  "bin",
  "cucumber-js"
);

const result = spawnSync(process.execPath, [cucumberBin, ...cucumberArgs], {
  stdio: "inherit",
  env: process.env
});

if (fs.existsSync(path.join(reportsDir, "cucumber-report.json"))) {
  console.log("\nConverting Cucumber JSON to Allure results...");
  const converter = path.join(__dirname, "scripts", "cucumber-json-to-allure.js");
  const convertResult = spawnSync(process.execPath, [converter], {
    stdio: "inherit",
    env: process.env
  });

  if ((convertResult.status ?? 1) !== 0) {
    console.error("Cucumber JSON to Allure conversion failed.");
  }
}

const canGenerateAllureReport =
  fs.existsSync(allureResultsDir) && fs.readdirSync(allureResultsDir).length > 0;

if (canGenerateAllureReport) {
  const allureBin = path.join(
    __dirname,
    "node_modules",
    "allure-commandline",
    "bin",
    "allure"
  );

  console.log("\nGenerating Allure report...");
  const reportResult = spawnSync(
    process.execPath,
    [
      allureBin,
      "generate",
      allureResultsDir,
      "--clean",
      "-o",
      allureReportDir
    ],
    {
      stdio: "inherit",
      env: process.env
    }
  );

  if ((reportResult.status ?? 1) !== 0) {
    console.error("Allure report generation failed.");
  }
} else {
  console.warn("No Allure results were created, so the Allure report was not generated.");
}

process.exit(result.status ?? 1);
