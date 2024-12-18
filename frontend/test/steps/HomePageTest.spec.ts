import { Given, When, Then, Before, setDefaultTimeout } from '@cucumber/cucumber'
import { expect } from '@playwright/test';
import Logger from '../../../utils/LoggingUtils';
import { pageFixture } from '../hooks/PageFixture';

setDefaultTimeout(60*1000)

Given('User should navigate to {string} url', async function (url: string) {
    Logger.debug(`Navigating to URL: ${url}`); 
    try {
        await pageFixture.homePageInstance.navigateHomeUrl(url)
        Logger.info(`Successfully navigated to URL: ${url}`);
    } catch (error) {
        Logger.error(`Failed to navigate to URL: ${url}. Error: ${error.message}`);
        throw error;
    }
});

Given('User should handle Cookies', async function () {
    Logger.debug("Handling cookies..."); 
    try {
        await pageFixture.cookiePageInstance.cookieAccept(pageFixture.page)
        Logger.info("Cookies accepted successfully.");
    } catch (error) {
        Logger.error(`Error while accepting cookies. Error: ${error.message}`);
        throw error;
    }
});

Given('User should be on home page with title {string}', async function (title: string) {
    Logger.debug(`Verifying page title contains: ${title}`); 
    try {
        const pageTitle = await pageFixture.homePageInstance.getPageTitle(pageFixture.page)
        Logger.debug(`Page title: ${pageTitle}`); 
        expect(pageTitle).toContain(title)
        Logger.info("Page title is correct.");
    } catch (error) {
        Logger.error(`Error while verifying page title. Expected: ${title}, Actual: ${await pageFixture.homePageInstance.getPageTitle(pageFixture.page)}. Error: ${error.message}`);
        throw error;
    }
});

Given('Able to see {string} button', async function (string: string) {
    Logger.debug(`Checking visibility of button: ${string}`); 
    try {
        if (string.includes('Upptäck')) {
            const visible = await pageFixture.homePageInstance.isDiscoverButtonVisible(string);
            Logger.debug(`Discover button visibility: ${visible}`); 
            expect(visible).toBeTruthy()
            Logger.info("Discover button is visible.");
        } else if (string.includes('Leveransklara bilar')) {
            const visible = await pageFixture.homePageInstance.isReadyForDeliveryButtonVisible(string);
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
            await pageFixture.homePageInstance.clickOnDiscoverButton(string)
            Logger.info("Clicked on Discover button.");
        } else if (string.includes('Leveransklara bilar')) {
            Logger.debug("Clicking on Ready for Delivery button.");
            await pageFixture.homePageInstance.clickOnReadyForDeliveryButton(string)
            Logger.info("Clicked on Ready for Delivery button.");
        } else if (string.includes('Prenumerera')) {
            Logger.debug("Clicking on Subscribe News button.");
            await pageFixture.homePageInstance.clickOnSubcribeNewsButton(string)
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
        const pageTitle = await pageFixture.homePageInstance.getPageTitle(pageFixture.page)
        Logger.debug(`Actual page title: ${pageTitle}`); 
        expect(pageTitle).toContain(title)
        Logger.info("Page title verified successfully.");
    } catch (error) {
        Logger.error(`Error while verifying page title. Expected: ${title}, Actual: ${await pageFixture.homePageInstance.getPageTitle(pageFixture.page)}. Error: ${error.message}`);
        throw error;
    }
});

Given('Able to see {string} button under latest news of Polestar section', async function (string: string) {      
    Logger.debug(`Checking visibility of button: ${string} under Latest News section`); 
    try {
        const visible = await pageFixture.homePageInstance.isSubscribeButtonVisible(string);
        Logger.debug(`Subscribe button visibility: ${visible}`); 
        expect(visible).toBeTruthy()
        Logger.info("Subscribe button is visible under Latest News section.");
    } catch (error) {
        Logger.error(`Error while checking visibility of button: ${string}. Error: ${error.message}`);
        throw error;
    }
});
