const assert = require("assert");
const { Given, When, Then } = require("@cucumber/cucumber");
const { request } = require("playwright");

const BASE_URL = process.env.BASE_URL || "https://automationexercise.com";

function valueFromDataTable(dataTable) {
  if (!dataTable) {
    return undefined;
  }

  return Object.fromEntries(dataTable.raw().map(([key, value]) => [key, value]));
}

function uniqueApiUser(prefix = "api") {
  const id = `${Date.now()}${Math.floor(Math.random() * 100000)}`;
  return {
    name: `API Test ${id}`,
    email: `${prefix}.${id}@example.com`,
    password: "automation123",
    title: "Mr",
    birth_date: "10",
    birth_month: "5",
    birth_year: "1991",
    firstname: "Api",
    lastname: `User${id}`,
    company: "Automation Exercise",
    address1: "123 Test Street",
    address2: "Suite 4",
    country: "United States",
    zipcode: "10001",
    state: "New York",
    city: "New York",
    mobile_number: "9999999999"
  };
}

async function apiContext(world) {
  if (!world.apiContext) {
    world.apiContext = await request.newContext({ baseURL: BASE_URL });
  }
  return world.apiContext;
}

async function parseAutomationExerciseResponse(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`Expected JSON response but received: ${text.slice(0, 500)}`);
  }
}

async function sendApiRequest(world, method, path, options = {}) {
  const context = await apiContext(world);
  const response = await context.fetch(path, {
    method,
    ...options
  });
  const body = await parseAutomationExerciseResponse(response);

  world.lastApiResponse = {
    httpStatus: response.status(),
    body
  };

  await world.attach(
    JSON.stringify(
      {
        method,
        path,
        httpStatus: response.status(),
        response: body
      },
      null,
      2
    ),
    "application/json"
  );

  return world.lastApiResponse;
}

async function createUser(world, user) {
  return sendApiRequest(world, "POST", "/api/createAccount", { form: user });
}

async function deleteUser(world, user) {
  return sendApiRequest(world, "DELETE", "/api/deleteAccount", {
    form: {
      email: user.email,
      password: user.password
    }
  });
}

Given("the Automation Exercise API is available", async function () {
  await apiContext(this);
});

Given("I have a registered API test user", async function () {
  this.testData.apiUser = uniqueApiUser("registered.api");
  const result = await createUser(this, this.testData.apiUser);

  assert.strictEqual(
    result.body.responseCode,
    201,
    `Could not create API test user: ${JSON.stringify(result.body)}`
  );
});

When("I send a {string} API request to {string}", async function (method, path) {
  await sendApiRequest(this, method, path);
});

When("I send a {string} API request to {string} with form data", async function (method, path, dataTable) {
  await sendApiRequest(this, method, path, { form: valueFromDataTable(dataTable) });
});

When("I send a {string} API request to {string} with the API test user's login data", async function (method, path) {
  const user = this.testData.apiUser;
  assert.ok(user, "API test user has not been created.");

  await sendApiRequest(this, method, path, {
    form: {
      email: user.email,
      password: user.password
    }
  });
});

When("I send a {string} API request to {string} with the API test user's email", async function (method, path) {
  const user = this.testData.apiUser;
  assert.ok(user, "API test user has not been created.");

  await sendApiRequest(this, method, path, {
    params: {
      email: user.email
    }
  });
});

When("I create a new API test user account", async function () {
  this.testData.apiUser = uniqueApiUser("created.api");
  await createUser(this, this.testData.apiUser);
});

When("I update the API test user account", async function () {
  const user = this.testData.apiUser;
  assert.ok(user, "API test user has not been created.");

  this.testData.apiUser = {
    ...user,
    name: `${user.name} Updated`,
    firstname: "Updated",
    city: "Boston",
    state: "Massachusetts",
    zipcode: "02108"
  };

  await sendApiRequest(this, "PUT", "/api/updateAccount", {
    form: this.testData.apiUser
  });
});

Then("the API response code should be {int}", async function (expectedCode) {
  assert.ok(this.lastApiResponse, "No API response was captured.");
  assert.strictEqual(this.lastApiResponse.body.responseCode, expectedCode);
});

Then("the API response message should be {string}", async function (expectedMessage) {
  assert.ok(this.lastApiResponse, "No API response was captured.");
  assert.strictEqual(this.lastApiResponse.body.message, expectedMessage);
});

Then("the API response should include a non-empty {string} list", async function (fieldName) {
  assert.ok(this.lastApiResponse, "No API response was captured.");
  const list = this.lastApiResponse.body[fieldName];

  assert.ok(Array.isArray(list), `Expected "${fieldName}" to be an array.`);
  assert.ok(list.length > 0, `Expected "${fieldName}" to contain at least one item.`);
});

Then("the API response should include a {string} object", async function (fieldName) {
  assert.ok(this.lastApiResponse, "No API response was captured.");
  const value = this.lastApiResponse.body[fieldName];

  assert.ok(value && typeof value === "object" && !Array.isArray(value), `Expected "${fieldName}" to be an object.`);
});

Then("I delete the API test user", async function () {
  const user = this.testData.apiUser;
  assert.ok(user, "API test user has not been created.");

  const result = await deleteUser(this, user);
  assert.strictEqual(
    result.body.responseCode,
    200,
    `Could not delete API test user: ${JSON.stringify(result.body)}`
  );

  this.testData.apiUser = null;
});
