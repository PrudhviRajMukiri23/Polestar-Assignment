const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "./test-results",
  reportPath: "./test-results/json-reports/",
  reportName: "Polestar UI Automation",
  pageTitle: "Polestar UI Automation Test Report",
  metadata:{
    browser: {
        name: 'chrome',
        version: 'latest'
    },
    device: 'Prudhvi PC',
    platform: {
        name: 'ubuntu',
        version: 'latest'
    }
  },
  customData: {
    title: "Run Info",
    data: [
      { label: "Project", value: "Polestar" },
      { label: "Release", value: "1.1" }
    ],
  },
});