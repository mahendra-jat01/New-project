const { setWorldConstructor, World } = require("@cucumber/cucumber");

class CustomWorld extends World {
  constructor({ attach, log, link, parameters }) {
    super({ attach, log, link, parameters });
    this.browser = null;
    this.context = null;
    this.page = null;
    this.pages = {};
    this.testData = {};
  }
}

setWorldConstructor(CustomWorld);
