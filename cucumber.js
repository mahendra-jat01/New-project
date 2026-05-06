module.exports = {
  default: {
    require: [
      "src/support/world.js",
      "src/support/hooks.js",
      "src/step-definitions/**/*.js"
    ],
    paths: ["src/features/**/*.feature"],
    format: [
      "html:reports/cucumber-report.html",
      "json:reports/cucumber-report.json",
      "allure-cucumberjs/reporter",
      "summary"
    ],
    formatOptions: {
      resultsDir: "allure-results"
    },
    timeout: 60000
  }
};
