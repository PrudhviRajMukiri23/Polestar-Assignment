export const Locators = {
    firstname: {
        xpath: "//input[@name='firstName']",
        description: "first name field for news subcription form"
    },
    lastname: {
        xpath: "//input[@name='lastName']",
        description: "last name field for news subcription form"
    },
    email: {
        xpath: "//input[@name='email']",
        description: "email field for news subcription form"
    },
    postcode: {
        xpath: "//input[@name='zipCode']",
        description: "post code filed for news subcription form"
    },
    checkbox: {
        xpath: "//input[@type='checkbox' and @id='a4ca2ade-63dd-43c3-a17b-1f42b87db55c']",
        description: "accept checkbox for polestar data policy"
    },
    submit: {
        xpath: "//button[@type='submit']/descendant::span[contains(text(), 'Skicka')]",
        description: "submit button for news subcription"
    },
    subcriptionConfirmationMessage: {
        xpath: "//*[contains(text(), 'Bekräfta din prenumeration')]",
        description: "confirmation success message for subcription of news"
    }
}