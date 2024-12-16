import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber'
import { Browser, BrowserContext, chromium, Page, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import CookieActions from '../../utils/CookieActions';

setDefaultTimeout(60*1000)
let page: Page, browser: Browser, context: BrowserContext
let homePage: HomePage
let cookieInstance: CookieActions

Before(
    async function() {
        browser = await chromium.launch({headless: false})
        context = await browser.newContext()
        page = await context.newPage()
        await page.waitForLoadState('load');
        homePage = new HomePage(page)
        cookieInstance = CookieActions.getInstance(page)
    }
)

After(async function () {
    await browser.close();
});

Given('User should navigate to {string} url', async function (url: string) {
    await homePage.navigateHomeUrl(url)
});

Given('User should handle Cookies', async function () {
    await cookieInstance.cookieAccept(page)
});

Given('User should be on home page with title {string}', async function (title: string) {
    expect(await homePage.getPageTitle(page)).toContain(title)
});

// Given('Able to see {string} button', async function (string) {
    
// });