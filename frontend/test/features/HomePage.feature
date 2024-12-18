Feature: Home Page Functionality Checks

    Background: 
        Given User should navigate to 'https://www.polestar.com/se' url
        And User should handle Cookies
    
    @Smoke @Regression
    Scenario: Verify the Discover button functionality
        Given User should be on home page with title 'Polestar – Elbilar | Polestar Sverige'
        And Able to see 'Upptäck' button
        When User click on the 'Upptäck' button
        Then User should land on page with title 'Polestar 4 - Vår elektriska SUV-coupé | Polestar Sverige'

    @Smoke @Regression
    Scenario: Verify the Ready For Delivery button functionality
        Given User should be on home page with title 'Polestar – Elbilar | Polestar Sverige'
        And Able to see 'Leveransklara bilar' button
        When User click on the 'Leveransklara bilar' button
        Then User should land on page with title 'Förkonfigurerade Polestar-bilar för snabb leverans | Polestar Sverige'
