import { Page } from "@playwright/test"
import PlaywrightActions from "../playwright-utils/PlaywrightActions"
import Logger from "../../../utils/LoggingUtils"
import { Locators } from "../xpaths/HomePage-Locators"

class HomePage extends PlaywrightActions {

    private page: Page | null
    private locators: Locators

    constructor(page: Page) {
        super()
        this.page = page
        this.locators = new Locators()
    }

    async navigateHomeUrl(url: string) {
        Logger.debug(`Attempting to navigate to home page with URL: ${url}`)  
        try {
            await this.goToUrl(this.page, url)
            Logger.info(`Successfully navigated to home page with URL: ${url}`)  
        } catch (err) {
            Logger.error(`Failed to navigate to home page with URL: ${url}. Error: ${err.message}`)  
        }
    }

    async isDiscoverButtonVisible(text: string) {
        const value = this.locators.discoverButton.xpath
        Logger.debug(`Checking visibility of the 'Discover' button with text: ${text}`)  
        if(value.includes(text)) {
            try {
                const isVisible = await this.isElementVisible(this.page, value)
                Logger.info(`'Discover' button with text: ${text} is visible: ${isVisible}`)  
                return isVisible
            } catch (err) {
                Logger.error(`Error while checking visibility of 'Discover' button: ${err.message}`)  
                throw new Error(`Error while checking visibility of 'Discover' button: ${err.message}`)
            }
        } else {
            Logger.error(`Can't find the element with text: ${text}`)  
            throw new Error(`Can't find the element with text: ${text}`)
        }
    }

    async clickOnDiscoverButton(text: string) {
        const value = this.locators.discoverButton.xpath
        Logger.debug(`Attempting to click on 'Discover' button with text: ${text}`)  
        if(value.includes(text)) {
            try {
                await this.clickOnLocator(this.page, value)
                Logger.info(`Successfully clicked on 'Discover' button with text: ${text}`)  
            } catch (err) {
                Logger.error(`Error while clicking on 'Discover' button: ${err.message}`)  
                throw new Error(`Error while clicking on 'Discover' button: ${err.message}`)
            }
        } else {
            Logger.error(`Can't find the element with text: ${text}`)  
            throw new Error(`Can't find the element with text: ${text}`)
        }
    }

    async isReadyForDeliveryButtonVisible(text: string) {
        const value = this.locators.readyForDelivery.xpath
        Logger.debug(`Checking visibility of 'Ready for Delivery' button with text: ${text}`)  
        if(value.includes(text)) {
            try {
                const isVisible = await this.isElementVisible(this.page, value)
                Logger.info(`'Ready for Delivery' button with text: ${text} is visible: ${isVisible}`)  
                return isVisible
            } catch (err) {
                Logger.error(`Error while checking visibility of 'Ready for Delivery' button: ${err.message}`)  
                throw new Error(`Error while checking visibility of 'Ready for Delivery' button: ${err.message}`)
            }
        } else {
            Logger.error(`Can't find the element with text: ${text}`)  
            throw new Error(`Can't find the element with text: ${text}`)
        }
    }

    async clickOnReadyForDeliveryButton(text: string) {
        const value = this.locators.readyForDelivery.xpath
        Logger.debug(`Attempting to click on 'Ready for Delivery' button with text: ${text}`)  
        if(value.includes(text)) {
            try {
                await this.clickOnLocator(this.page, value)
                Logger.info(`Successfully clicked on 'Ready for Delivery' button with text: ${text}`)  
            } catch (err) {
                Logger.error(`Error while clicking on 'Ready for Delivery' button: ${err.message}`)  
                throw new Error(`Error while clicking on 'Ready for Delivery' button: ${err.message}`)
            }
        } else {
            Logger.error(`Can't find the element with text: ${text}`)  
            throw new Error(`Can't find the element with text: ${text}`)
        }
    }

    async isSubscribeButtonVisible(text: string) {
        const value = this.locators.subcribeNewsLetter.xpath
        Logger.debug(`Checking visibility of 'Subscribe' button with text: ${text}`)  
        if(value.includes(text)) {
            try {
                const isVisible = await this.isElementVisible(this.page, value)
                Logger.info(`'Subscribe' button with text: ${text} is visible: ${isVisible}`)  
                return isVisible
            } catch (err) {
                Logger.error(`Error while checking visibility of 'Subscribe' button: ${err.message}`)  
                throw new Error(`Error while checking visibility of 'Subscribe' button: ${err.message}`)
            }
        } else {
            Logger.error(`Can't find the element with text: ${text}`)  
            throw new Error(`Can't find the element with text: ${text}`)
        }
    }

    async clickOnSubcribeNewsButton(text: string) {
        const value = this.locators.subcribeNewsLetter.xpath
        Logger.debug(`Attempting to click on 'Subscribe' button with text: ${text}`)  
        if(value.includes(text)) {
            try {
                await this.clickOnLocator(this.page, value)
                Logger.info(`Successfully clicked on 'Subscribe' button with text: ${text}`)  
            } catch (err) {
                Logger.error(`Error while clicking on 'Subscribe' button: ${err.message}`)  
                throw new Error(`Error while clicking on 'Subscribe' button: ${err.message}`)
            }
        } else {
            Logger.error(`Can't find the element with text: ${text}`)  
            throw new Error(`Can't find the element with text: ${text}`)
        }
    }
}

export default HomePage
