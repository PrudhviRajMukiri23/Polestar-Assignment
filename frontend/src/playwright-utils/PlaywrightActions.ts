import { Page } from "@playwright/test";

class PlaywrightActions {

    async getPageTitle(page: Page) {
        try {
            let title = await page.title()
            return title
        } catch (err) {
            console.error(`Error while getting page title: ${err.message}`);
            throw new Error(`Failed to retrieve page title: ${err.message}`);
        }
    }

    async navigateToUrl(page: Page, url: string) {
        await page.goto(url)
        try {
            await page.goto(url)
        } catch (err) {
            console.error(`Error while navigating to URL: ${err.message}`);
            throw new Error(`Failed to navigate to ${url}: ${err.message}`);
        }
    }

    async clickOnLocator(page: Page, locatorPath: string) {
        try {
            await page.locator(locatorPath).click()
        } catch (err) {
            console.error(`Error while clicking on locator: ${locatorPath}, Error: ${err.message}`);
            throw new Error(`Failed to click on element with locator: ${locatorPath}. Error: ${err.message}`);
        }
    }

}

export default PlaywrightActions