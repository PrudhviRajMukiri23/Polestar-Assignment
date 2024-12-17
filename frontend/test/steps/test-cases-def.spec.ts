import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber'
import { Browser, BrowserContext, chromium, Page, expect } from '@playwright/test';
import HomePage from '../../src/pages/HomePage';
import CookieActions from '../../utils/CookieActions';
import NewsSubcribePage from '../../src/pages/NewsSubcribePage'
import Logger from '../../../utils/LoggingUtils';

setDefaultTimeout(60*1000)
let page: Page, browser: Browser, context: BrowserContext
let homePage: HomePage
let cookieInstance: CookieActions
let newsSubcribePage: NewsSubcribePage

Before(
    async ()=>{
        Logger.info("Initializing the setup process for test...")
        try {
            browser = await chromium.launch({headless: true, channel: 'chrome'})
            context = await browser.newContext()
            await context.tracing.start({screenshots: true, snapshots: true})
            page = await context.newPage()
            await page.waitForLoadState('load');
            Logger.debug("Page loaded successfully."); 
            homePage = new HomePage(page)
            cookieInstance = CookieActions.getInstance(page)
            newsSubcribePage = new NewsSubcribePage(page)
            Logger.info("Completed the setup process for test...")
        } catch (error) {
            Logger.error(`Error during setup: ${error.message}`);
            throw error;
        }
    }
)

After(async ()=>{
    Logger.info("Initializing the closure process for test...")
    try {
        await page.waitForLoadState('load')
        const timestamp = new Date().toISOString().replace(/[:.-]/g, '_')
        const traceFileName = `traces-${timestamp}.zip`
        await context.tracing.stop({ path: `./traces/${traceFileName}` })
        await page.close()
        await context.close()
        await browser.close()
        Logger.info("Completed the closure process for test...")
    } catch (error) {
        Logger.error(`Error during closure: ${error.message}`);
        throw error;
    }
});

Given('User should navigate to {string} url', async function (url: string) {
    Logger.debug(`Navigating to URL: ${url}`); 
    try {
        await homePage.navigateHomeUrl(url)
        Logger.info(`Successfully navigated to URL: ${url}`);
    } catch (error) {
        Logger.error(`Failed to navigate to URL: ${url}. Error: ${error.message}`);
        throw error;
    }
});

Given('User should handle Cookies', async function () {
    Logger.debug("Handling cookies..."); 
    try {
        await cookieInstance.cookieAccept(page)
        Logger.info("Cookies accepted successfully.");
    } catch (error) {
        Logger.error(`Error while accepting cookies. Error: ${error.message}`);
        throw error;
    }
});

Given('User should be on home page with title {string}', async function (title: string) {
    Logger.debug(`Verifying page title contains: ${title}`); 
    try {
        const pageTitle = await homePage.getPageTitle(page)
        Logger.debug(`Page title: ${pageTitle}`); 
        expect(pageTitle).toContain(title)
        Logger.info("Page title is correct.");
    } catch (error) {
        Logger.error(`Error while verifying page title. Expected: ${title}, Actual: ${await homePage.getPageTitle(page)}. Error: ${error.message}`);
        throw error;
    }
});

Given('Able to see {string} button', async function (string: string) {
    Logger.debug(`Checking visibility of button: ${string}`); 
    try {
        if (string.includes('Upptäck')) {
            const visible = await homePage.isDiscoverButtonVisible(string);
            Logger.debug(`Discover button visibility: ${visible}`); 
            expect(visible).toBeTruthy()
            Logger.info("Discover button is visible.");
        } else if (string.includes('Leveransklara bilar')) {
            const visible = await homePage.isReadyForDeliveryButtonVisible(string);
            Logger.debug(`Ready for Delivery button visibility: ${visible}`); 
            expect(visible).toBeTruthy()
            Logger.info("Ready for delivery button is visible.");
        }
    } catch (error) {
        Logger.error(`Error while checking visibility of button: ${string}. Error: ${error.message}`);
        throw error;
    }
});

When('User click on the {string} button', async function (string: string) {
    Logger.debug(`Clicking on the button: ${string}`); 
    try {
        if (string.includes('Upptäck')) {
            Logger.debug("Clicking on Discover button.");
            await homePage.clickOnDiscoverButton(string)
            Logger.info("Clicked on Discover button.");
        } else if (string.includes('Leveransklara bilar')) {
            Logger.debug("Clicking on Ready for Delivery button.");
            await homePage.clickOnReadyForDeliveryButton(string)
            Logger.info("Clicked on Ready for Delivery button.");
        } else if (string.includes('Prenumerera')) {
            Logger.debug("Clicking on Subscribe News button.");
            await homePage.clickOnSubcribeNewsButton(string)
            Logger.info("Clicked on Subscribe News button.");
        }
    } catch (error) {
        Logger.error(`Error while clicking on button: ${string}. Error: ${error.message}`);
        throw error;
    }
});

Then('User should land on page with title {string}', async function (title: string) {
    Logger.debug(`Verifying the page title contains: ${title}`); 
    try {
        const pageTitle = await homePage.getPageTitle(page)
        Logger.debug(`Actual page title: ${pageTitle}`); 
        expect(pageTitle).toContain(title)
        Logger.info("Page title verified successfully.");
    } catch (error) {
        Logger.error(`Error while verifying page title. Expected: ${title}, Actual: ${await homePage.getPageTitle(page)}. Error: ${error.message}`);
        throw error;
    }
});

Given('Able to see {string} button under latest news of Polestar section', async function (string: string) {      
    Logger.debug(`Checking visibility of button: ${string} under Latest News section`); 
    try {
        const visible = await homePage.isSubscribeButtonVisible(string);
        Logger.debug(`Subscribe button visibility: ${visible}`); 
        expect(visible).toBeTruthy()
        Logger.info("Subscribe button is visible under Latest News section.");
    } catch (error) {
        Logger.error(`Error while checking visibility of button: ${string}. Error: ${error.message}`);
        throw error;
    }
});

When('User fill all the details like {string}, {string}, {string} and {int}', async function (firstname: string, lastname: string, email: string, postnumber: number) {
    Logger.debug(`Filling in details for News Subscription: ${firstname}, ${lastname}, ${email}, ${postnumber}`); 
    try {
        await newsSubcribePage.fillDetailsForNewsSubcription(firstname, lastname, email, postnumber)
        Logger.info("Successfully filled subscription details.");
    } catch (error) {
        Logger.error(`Error while filling subscription details. Error: ${error.message}`);
        throw error;
    }
});

When('User should check the checkbox and click on {string} button', async function (string) {
    Logger.debug(`Checking checkbox and clicking on button: ${string}`); 
    try {
        await newsSubcribePage.clickOnCheckBoxAndSubmitButton(string)
        Logger.info("Checkbox checked and button clicked successfully.");
    } catch (error) {
        Logger.error(`Error while checking checkbox and clicking on button: ${string}. Error: ${error.message}`);
        throw error;
    }
});

Then('User should verify the successful message of subcription as {string}', async function (string) {
    Logger.debug(`Verifying subscription success message: ${string}`); 
    try {
        const successMessage = await newsSubcribePage.verifySuccessMessageOfSubcription(string);
        Logger.debug(`Actual success message: ${successMessage}`); 
        expect(successMessage).toBeTruthy()
        Logger.info("Successfully verified subscription success message.");
    } catch (error) {
        Logger.error(`Error verifying subscription success message: ${string}. Error: ${error.message}`);
        throw error;
    }
});
