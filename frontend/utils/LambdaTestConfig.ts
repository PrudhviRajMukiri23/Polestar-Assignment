import * as base from "@playwright/test";
import { chromium } from "playwright";

const capabilities = {
  browserName: "Chrome", // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
  browserVersion: "latest",
  "LT:Options": {
    platform: "Windows 10",
    build: "Playwright TS Build",
    name: "Playwright Test",
    user: process.env.LT_USERNAME || 'prudhviraj420h0',
    accessKey: process.env.LT_ACCESS_KEY || 'A2KN38AaRWIoOpOAbvruuwaTZ2PqtZGsw7xKuazqVbS1T7j7cJ',
    network: true,
    video: true,
    console: true,
    tunnel: false,
    tunnelName: "",
    geoLocation: '',
  },
};

  function getwsEndpointLambdaTest() {
    return `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
        JSON.stringify(capabilities))}`
}

export default getwsEndpointLambdaTest