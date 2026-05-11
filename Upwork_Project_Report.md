# End-to-End Test Automation Pipeline with Playwright, GitHub Actions, and Allure Reports

## Project Overview

This project is a complete end-to-end test automation framework built with Playwright, Cucumber BDD, GitHub Actions, and Allure Reports. The framework validates key user flows on the Sauce Demo application and is designed to support reliable browser automation, automated CI execution, and clear test reporting for both technical and non-technical stakeholders.

The main goal of this project was to create a maintainable automation pipeline where tests can be written in readable BDD format, executed locally or in CI, and published with visual Allure reports after every workflow run.

## Tools and Technologies Used

- Playwright for modern browser automation
- Cucumber.js for BDD-style test scenarios
- JavaScript and Node.js for framework development
- Page Object Model for reusable and maintainable test code
- GitHub Actions for CI/CD automation
- Allure Reports for rich test execution reporting
- GitHub Pages for publishing static HTML test reports

## Key Features Implemented

### Playwright Test Automation

The framework uses Playwright to automate real browser interactions across modern browsers. Playwright provides strong auto-waiting, reliable locators, screenshots, videos, traces, and support for headless and headed execution.

Implemented browser support includes:

- Chromium
- Firefox
- WebKit

The framework can run tests in headless mode for CI pipelines and headed mode for local debugging.

### BDD Test Design with Cucumber

Test cases are written using Cucumber feature files, making the scenarios easy to understand for QA engineers, developers, clients, and product stakeholders.

Covered demo scenarios include:

- Valid user login
- Invalid login validation
- Add product to cart
- Checkout process

This approach keeps test intent clear while separating business-readable scenarios from technical implementation.

### Page Object Model Architecture

The project follows the Page Object Model pattern to keep the automation code clean, reusable, and easier to maintain.

Page classes include:

- Login page
- Inventory page
- Cart page
- Checkout page
- Base page utilities

This structure reduces duplication and makes future test expansion faster.

### GitHub Actions CI Pipeline

The project includes a GitHub Actions workflow that automatically runs the test suite on:

- Push to the main branch
- Pull requests targeting the main branch
- Manual workflow dispatch

The CI pipeline performs the following steps:

- Checks out the repository
- Sets up Node.js
- Installs dependencies with `npm ci`
- Installs Playwright browsers with required Linux dependencies
- Runs the Cucumber Playwright test suite
- Generates Allure test results
- Uploads the Allure report as a GitHub Actions artifact
- Publishes the Allure HTML report to the `gh-pages` branch

This ensures automated validation whenever code changes are introduced.

### Allure Reporting

Allure Reports were integrated to provide a clean and interactive test reporting experience. The report helps teams quickly understand the health of test execution and investigate failures.

Allure reporting provides:

- Test execution dashboards
- Passed, failed, skipped, and broken test status
- Step-level execution details
- Failure logs and attachments
- Screenshots and debugging evidence
- Static HTML report output
- Easy sharing through GitHub Pages or workflow artifacts

## Local Execution Commands

The framework supports multiple execution modes:

```bash
npm test
```

Runs the complete Cucumber test suite.

```bash
npm run test:headed
```

Runs tests with a visible browser for debugging.

```bash
npm run test:firefox
```

Runs tests on Firefox.

```bash
npm run test:webkit
```

Runs tests on WebKit.

```bash
npm run test:tags -- "@smoke"
```

Runs tagged scenarios.

```bash
npm run allure:generate
```

Generates the Allure HTML report.

```bash
npm run allure:open
```

Opens the generated Allure report locally.

## Business Value

This automation pipeline improves software delivery by running browser tests automatically whenever new code is pushed or a pull request is created. It reduces manual regression effort, catches defects earlier, and gives the team a clear visual report of test execution.

The Allure report makes the results easy to review, while GitHub Actions ensures the entire validation process is automated and repeatable.

## Project Outcome

The final result is a professional end-to-end automation framework that supports local execution, CI execution, cross-browser testing, BDD scenarios, reusable page objects, and shareable Allure reports.

This project demonstrates practical experience with modern QA automation workflows and shows the ability to build a complete test pipeline from framework setup to CI reporting.

## Upwork Portfolio Summary

Built a complete end-to-end test automation framework using Playwright, Cucumber BDD, GitHub Actions, and Allure Reports. The project includes cross-browser test execution, Page Object Model architecture, CI automation on push and pull requests, Allure HTML report generation, artifact upload, and GitHub Pages report publishing. This framework helps teams reduce manual testing effort, detect regressions early, and review test results through clean, shareable reports.

## Suggested Upwork Project Title

End-to-End Playwright Automation Framework with GitHub Actions CI and Allure Reporting

## Skills Demonstrated

- Playwright automation
- JavaScript test framework development
- Cucumber BDD
- Page Object Model
- CI/CD with GitHub Actions
- Allure report integration
- Cross-browser testing
- Test artifact management
- GitHub Pages report publishing
- QA automation pipeline design
