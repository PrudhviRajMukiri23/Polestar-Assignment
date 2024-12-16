import { Page } from '@playwright/test'
import PlaywrightActions from '../playwright-utils/PlaywrightActions'
import { Locators } from './CookieActions-Locators'

class CookieActions extends PlaywrightActions{

    private static instance: CookieActions | null = null

    private dialogAccept: string

    private page: Page

    private constructor(page: Page) {
        super()
        this.page = page
        this.dialogAccept = Locators.cookieeAccept.xpath
    }

    async cookieAccept(page: Page) {
        await page.waitForSelector(this.dialogAccept, { timeout: 5000, state: 'visible' })
        await this.clickOnLocator(page, this.dialogAccept)
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