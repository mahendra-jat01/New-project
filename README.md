# Playwright Cucumber Allure Framework

JavaScript automation framework using Playwright, Cucumber BDD, Page Object Model, and Allure Reporting.

## Tech Stack

- Node.js
- Playwright
- Cucumber.js
- Allure CucumberJS
- Page Object Model

## Folder Structure

```text
.
├── cucumber.js
├── playwright.config.js
├── package.json
├── .env.example
├── src
│   ├── features
│   │   ├── cart.feature
│   │   ├── checkout.feature
│   │   └── login.feature
│   ├── pages
│   │   ├── BasePage.js
│   │   ├── CartPage.js
│   │   ├── CheckoutPage.js
│   │   ├── InventoryPage.js
│   │   └── LoginPage.js
│   ├── step-definitions
│   │   ├── cart.steps.js
│   │   ├── checkout.steps.js
│   │   └── login.steps.js
│   └── support
│       ├── hooks.js
│       └── world.js
└── reports
```

## Setup

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Optional local environment file:

```bash
copy .env.example .env
```

## Running Tests

Run all tests in headless Chromium:

```bash
npm test
```

Run with a visible browser:

```bash
npm run test:headed
```

Run a specific tag:

```bash
npm run test:tags -- "@smoke"
```

Run on Firefox or WebKit:

```bash
npm run test:firefox
npm run test:webkit
```

## Allure Report

Generate the report after a test run:

```bash
npm run allure:generate
```

Open the generated report:

```bash
npm run allure:open
```

Generate and open in one command:

```bash
npm run report
```

## GitHub Actions CI

This project includes a workflow at `.github/workflows/playwright-cucumber-allure.yml`.

The workflow:

- Runs on push and pull request to `main`
- Installs Node.js dependencies with `npm ci`
- Installs Playwright browsers with Linux dependencies
- Runs the Cucumber BDD suite with `npm test`
- Generates an Allure report
- Uploads the report as a workflow artifact
- Publishes the report to the `gh-pages` branch for GitHub Pages

To enable GitHub Pages:

1. Push this project to GitHub.
2. Go to repository `Settings`.
3. Open `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select branch `gh-pages`.
6. Select folder `/ (root)`.
7. Save the setting.

After the next successful workflow run, your Allure report will be available from the GitHub Pages URL shown in the Pages settings.

## Demo Scenarios

The framework uses [Sauce Demo](https://www.saucedemo.com/) and includes:

- Valid login
- Invalid login
- Add product to cart
- Checkout process

## VS Code

Open this folder in VS Code, install dependencies, and run tests from the integrated terminal. Recommended extensions:

- Playwright Test for VS Code
- Cucumber

## Configuration

Use `.env` to override defaults:

```text
BASE_URL=https://www.saucedemo.com/
BROWSER=chromium
HEADLESS=true
SLOW_MO=0
DEFAULT_TIMEOUT=10000
```
