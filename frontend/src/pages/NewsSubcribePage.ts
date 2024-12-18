import { Page } from "@playwright/test"
import PlaywrightActions from "../playwright-utils/PlaywrightActions"
import Logger from "../../../utils/LoggingUtils"
import { Locators } from "../xpaths/NewsSubcribePage-Locators"

class NewsSubcribePage extends PlaywrightActions {
    private page: Page
    private locators: Locators

    constructor(page: Page) {
        super()
        this.page = page
        this.locators = new Locators()
    }

    async fillDetailsForNewsSubcription(firstname: string, lastname: string, email: string, postnumber: number) {
        Logger.debug(`Filling out details for newsletter subscription with firstname: ${firstname}, lastname: ${lastname}, email: ${email}, and postnumber: ${postnumber}`) 
        try {
            await this.fillValueForTextField(this.page, this.locators.firstname.xpath, firstname)
            await this.fillValueForTextField(this.page, this.locators.lastname.xpath, lastname)
            await this.fillValueForTextField(this.page, this.locators.email.xpath, email)
            await this.fillValueForTextField(this.page, this.locators.postcode.xpath, postnumber)
            Logger.info(`Successfully filled out subscription details for ${firstname} ${lastname}.`)  
        } catch (err) {
            Logger.error(`Failed to fill subscription details. Error: ${err.message}`)  
            throw new Error(`Failed to fill subscription details. Error: ${err.message}`)
        }
    }

    async clickOnCheckBoxAndSubmitButton(buttonName: string) {
        Logger.debug(`Attempting to click the checkbox and submit button with name: ${buttonName}`)  
        try {
            await this.clickOnLocator(this.page, this.locators.checkbox.xpath)
            Logger.info(`Checkbox clicked successfully.`)  
            if(this.locators.submit.xpath.includes(buttonName)) {
                await this.clickOnLocator(this.page, this.locators.submit.xpath)
                Logger.info(`Successfully clicked the submit button with name: ${buttonName}`)  
            } else {
                Logger.error(`Can't find the element with name: ${buttonName}`)  
                throw new Error(`Can't find the element with name: ${buttonName}`)
            }
        } catch (err) {
            Logger.error(`Error while clicking the checkbox or submit button: ${err.message}`)  
            throw new Error(`Error while clicking the checkbox or submit button: ${err.message}`)
        }
    }

    async verifySuccessMessageOfSubcription(message: string) {
        Logger.debug(`Verifying subscription success message with content: ${message}`)  
        try {
            if(this.locators.subcriptionConfirmationMessage.xpath.includes(message)) {
                const isVisible = await this.isElementVisible(this.page, this.locators.subcriptionConfirmationMessage.xpath)
                Logger.info(`Subscription success message with content: ${message} is visible: ${isVisible}`)  
                return isVisible
            } else {
                Logger.error(`Can't find the element with message: ${message}`)  
                throw new Error(`Can't find the element with message: ${message}`)
            }
        } catch (err) {
            Logger.error(`Error while verifying subscription success message: ${err.message}`)  
            throw new Error(`Error while verifying subscription success message: ${err.message}`)
        }
    }
}

export default NewsSubcribePage
