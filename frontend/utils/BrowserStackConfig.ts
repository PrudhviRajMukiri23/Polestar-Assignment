import cp = require('child_process');
const clientPlaywrightVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];  // This is used to get the installed Playwright version on you machine. The same needs to be passed on to BrowserStack so that proper request-response mapping can be done for mismatched client and server Playwright versions in the same test

const caps = {
  'browser': 'playwright-chromium',
  'os': 'os x',
  'os_version': 'mojave',
  'browserstack.username': process.env.BROWSERSTACK_USERNAME || 'prudhvirajmukiri_TCb5Nl',
  'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY || 'ra9zGpdpJzV2tobz3PxM',
  'client.playwrightVersion': clientPlaywrightVersion
};

function getwsEndpointBrowserStack() {
    return `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`
}

export default getwsEndpointBrowserStack
