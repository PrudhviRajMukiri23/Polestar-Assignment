export class Locators {
    discoverButton = {
        xpath: "//a[@data-testid='gatsby-link' and starts-with(@href, '/se/polestar-4/')]/descendant::span[contains(text(), 'Upptäck')]",
        decription: "Discover button on home page"
    }
    readyForDelivery = {
        xpath: "//a[@data-testid='not-gatsby-link' and starts-with(@href, '/se/preconfigured-cars/polestar-4')]/descendant::span[contains(text(),'Tillgängliga bilar')]",
        decription: "Vehicles ready for delivery button on home page"
    }
    subcribeNewsLetter = {
        xpath: "//a[@class='css-1d0iuc5']/descendant::span[contains(text(), 'Prenumerera')]",
        decription: "Subcribe button under news scribtion section"
    }
}