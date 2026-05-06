const { setWorldConstructor } = require("@cucumber/cucumber");

class CustomWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.pages = {};
    this.testData = {};
  }
}

setWorldConstructor(CustomWorld);
