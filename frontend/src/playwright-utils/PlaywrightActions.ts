import { Page } from "@playwright/test"
import Logger from "../../../utils/LoggingUtils"

class PlaywrightActions {

    async getPageTitle(page: Page) {
        try {
            Logger.debug("Waiting for 3 seconds before getting page title...")  
            await page.waitForTimeout(3000)
            let title = await page.title()
            Logger.info(`Successfully retrieved page title: ${title}`) 
            return title
        } catch(err) {
            Logger.error(`Error while getting page title: ${err.message}`)  
            throw new Error(`Failed to retrieve page title: ${err.message}`)
        }
    }

    async goToUrl(page: Page, url: string) {
        Logger.debug(`Attempting to navigate to URL: ${url}`)  
        try {
            await page.goto(url)
            Logger.info(`Successfully navigated to URL: ${url}`) 
        } catch(err) {
            Logger.error(`Error while navigating to URL: ${err.message}`)  
            throw new Error(`Failed to navigate to ${url}: ${err.message}`)
        }
    }

    async clickOnLocator(page: Page, locatorPath: string) {
        Logger.debug(`Attempting to click on element with locator: ${locatorPath}`)  
        try {
            await page.locator(locatorPath).click()
            Logger.info(`Successfully clicked on locator: ${locatorPath}`) 
        } catch(err) {
            Logger.error(`Error while clicking on locator: ${locatorPath}, Error: ${err.message}`) 
            throw new Error(`Failed to click on element with locator: ${locatorPath}. Error: ${err.message}`)
        }
    }

    async isElementVisible(page: Page, xpath: string) {
        Logger.debug(`Checking visibility for element with xpath: ${xpath}`)  
        try {
            await page.waitForSelector(xpath, { state: 'visible' })
            const isVisible = await page.locator(xpath).isVisible()
            Logger.info(`Element with xpath: ${xpath} is visible: ${isVisible}`) 
            return isVisible
        } catch(err) {
            Logger.error(`Error while finding element with xpath of: ${xpath}, Error: ${err.message}`) 
            throw new Error(`Failed while finding element with xpath of: ${xpath}. Error: ${err.message}`)
        }
    }

    async fillValueForTextField(page: Page, locatorPath: string, text: string | number) {
        Logger.debug(`Filling text field with locator: ${locatorPath} and value: ${text}`)  
        try {
            const value = String(text) // Converting value to string if it's a number
            await page.locator(locatorPath).fill(value)
            Logger.info(`Successfully filled the text field with value: ${value}`) 
        } catch(err) {
            Logger.error(`Error while filling value in locator: ${locatorPath}, Error: ${err.message}`) 
            throw new Error(`Failed to fill value in element with locator: ${locatorPath}. Error: ${err.message}`)
        }
    }
}

export default PlaywrightActions
