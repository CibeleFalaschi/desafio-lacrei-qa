require("dotenv").config();

const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  reporter: "junit",

  reporterOptions: {
    mochaFile: "cypress/results/junit-[hash].xml",
    toConsole: true,
  },

  e2e: {
    specPattern: "**/*.feature",

    env: {
      K6_EMAIL: process.env.K6_EMAIL,
      K6_PASSWORD: process.env.K6_PASSWORD,
    },

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  },
});