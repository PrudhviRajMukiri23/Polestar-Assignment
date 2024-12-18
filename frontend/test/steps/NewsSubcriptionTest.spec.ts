import { When, Then, Before, setDefaultTimeout } from '@cucumber/cucumber'
import {expect } from '@playwright/test'
import Logger from '../../../utils/LoggingUtils'
import { pageFixture } from '../hooks/PageFixture'

setDefaultTimeout(60*1000)

When('User fill all the details like {string}, {string}, {string} and {int}', async function (firstname: string, lastname: string, email: string, postnumber: number) {
    Logger.debug(`Filling in details for News Subscription: ${firstname}, ${lastname}, ${email}, ${postnumber}`) 
    try {
        await pageFixture.newsSubcribePageInstance.fillDetailsForNewsSubcription(firstname, lastname, email, postnumber)
        Logger.info("Successfully filled subscription details.")
    } catch (error) {
        Logger.error(`Error while filling subscription details. Error: ${error.message}`)
        throw error
    }
})

When('User should check the checkbox and click on {string} button', async function (string) {
    Logger.debug(`Checking checkbox and clicking on button: ${string}`) 
    try {
        await pageFixture.newsSubcribePageInstance.clickOnCheckBoxAndSubmitButton(string)
        Logger.info("Checkbox checked and button clicked successfully.")
    } catch (error) {
        Logger.error(`Error while checking checkbox and clicking on button: ${string}. Error: ${error.message}`)
        throw error
    }
})

Then('User should verify the successful message of subcription as {string}', async function (string) {
    Logger.debug(`Verifying subscription success message: ${string}`) 
    try {
        const successMessage = await pageFixture.newsSubcribePageInstance.verifySuccessMessageOfSubcription(string)
        Logger.debug(`Actual success message: ${successMessage}`) 
        expect(successMessage).toBeTruthy()
        Logger.info("Successfully verified subscription success message.")
    } catch (error) {
        Logger.error(`Error verifying subscription success message: ${string}. Error: ${error.message}`)
        throw error
    }
})
