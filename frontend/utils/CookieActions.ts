import { Page } from '@playwright/test'
import PlaywrightActions from '../src/playwright-utils/PlaywrightActions'
import { Locators } from '../src/xpaths/CookieActions-Locators'

class CookieActions extends PlaywrightActions{

    private static instance: CookieActions | null = null

    private page: Page

    private locators: Locators

    private constructor(page: Page) {
        super()
        this.page = page
        this.locators = new Locators()
    }

    async cookieAccept(page: Page) {
        await page.waitForSelector(this.locators.cookieeAccept.xpath, { timeout: 5000, state: 'visible' })
        await this.clickOnLocator(page, this.locators.cookieeAccept.xpath)
        await page.waitForTimeout(2000)
    }

    public static getInstance(page: Page): CookieActions {
        if(!CookieActions.instance) {
            CookieActions.instance = new CookieActions(page)
        }
        return CookieActions.instance
    }

}

export default CookieActions