import { Page } from "@playwright/test";
import PlaywrightActions from "../playwright-utils/PlaywrightActions";
import { Locators } from "../xpaths/NewsSubcribePage-Locators";
import Logger from "../../../utils/LoggingUtils";

class NewsSubcribePage extends PlaywrightActions {
    private page: Page

    constructor(page: Page) {
        super()
        this.page = page
    }

    async fillDetailsForNewsSubcription(firstname: string, lastname: string, email: string, postnumber: number) {
        Logger.debug(`Filling out details for newsletter subscription with firstname: ${firstname}, lastname: ${lastname}, email: ${email}, and postnumber: ${postnumber}`); 
        try {
            await this.fillValueForTextField(this.page, Locators.firstname.xpath, firstname)
            await this.fillValueForTextField(this.page, Locators.lastname.xpath, lastname)
            await this.fillValueForTextField(this.page, Locators.email.xpath, email)
            await this.fillValueForTextField(this.page, Locators.postcode.xpath, postnumber)
            Logger.info(`Successfully filled out subscription details for ${firstname} ${lastname}.`);  
        } catch (err) {
            Logger.error(`Failed to fill subscription details. Error: ${err.message}`);  
            throw new Error(`Failed to fill subscription details. Error: ${err.message}`);
        }
    }

    async clickOnCheckBoxAndSubmitButton(buttonName: string) {
        Logger.debug(`Attempting to click the checkbox and submit button with name: ${buttonName}`);  
        try {
            await this.clickOnLocator(this.page, Locators.checkbox.xpath)
            Logger.info(`Checkbox clicked successfully.`);  
            if(Locators.submit.xpath.includes(buttonName)) {
                await this.clickOnLocator(this.page, Locators.submit.xpath)
                Logger.info(`Successfully clicked the submit button with name: ${buttonName}`);  
            } else {
                Logger.error(`Can't find the element with name: ${buttonName}`);  
                throw new Error(`Can't find the element with name: ${buttonName}`)
            }
        } catch (err) {
            Logger.error(`Error while clicking the checkbox or submit button: ${err.message}`);  
            throw new Error(`Error while clicking the checkbox or submit button: ${err.message}`);
        }
    }

    async verifySuccessMessageOfSubcription(message: string) {
        Logger.debug(`Verifying subscription success message with content: ${message}`);  
        try {
            if(Locators.subcriptionConfirmationMessage.xpath.includes(message)) {
                const isVisible = await this.isElementVisible(this.page, Locators.subcriptionConfirmationMessage.xpath)
                Logger.info(`Subscription success message with content: ${message} is visible: ${isVisible}`);  
                return isVisible
            } else {
                Logger.error(`Can't find the element with message: ${message}`);  
                throw new Error(`Can't find the element with message: ${message}`)
            }
        } catch (err) {
            Logger.error(`Error while verifying subscription success message: ${err.message}`);  
            throw new Error(`Error while verifying subscription success message: ${err.message}`);
        }
    }
}

export default NewsSubcribePage;
