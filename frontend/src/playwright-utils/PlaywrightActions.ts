import { Page } from "@playwright/test";

class PlaywrightActions {

    async getPageTitle(page: Page) {
        return await page.title()
    }

    async navigateToUrl(page: Page, url: string) {
        await page.goto(url)
    }

    async clickOnLocator(page: Page, locatorPath: string) {
        await page.locator(locatorPath).click()
    }

}

export default PlaywrightActions