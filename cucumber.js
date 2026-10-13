const os = require("os");

module.exports = {
  default: {
    require: [
      "src/support/world.js",
      "src/support/hooks.js",
      "src/step-definitions/**/*.js"
    ],
    paths: ["src/features/**/*.feature"],
    // Run scenarios in parallel across multiple workers. Configurable via
    // PARALLEL_WORKERS env var, defaulting to the requested 5 workers.
    parallel: Number(process.env.PARALLEL_WORKERS || 5),
    format: [
      "html:reports/cucumber-report.html",
      "json:reports/cucumber-report.json",
      "allure-cucumberjs/reporter",
      "summary"
    ],
    formatOptions: {
      resultsDir: "allure-results"
    },
    timeout: 120000
  }
};
