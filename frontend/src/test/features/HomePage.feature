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

    @Regression
    Scenario Outline: Verify Subcribe to News of Polestar functionality
        Given User should be on home page with title 'Polestar – Elbilar | Polestar Sverige'
        And Able to see 'Prenumerera' button under latest news of Polestar section
        And User click on the 'Prenumerera' button
        And User should land on page with title 'Prenumerera på nyhetsbrev | Polestar Sverige'
        When User fill all the details like <firstname>, <lastname>, <email> and <postnumber>
        And User should check the checkbox and click on 'Skicka' button
        Then User should verify the successful message of subcription as 'Bekräfta din prenumeration'
     Examples: 
         | firstname   | lastname   | email            | postnumber |
         | "prudhvi"   | "Raj"      | "abc@gmail.com"  | 23456      |
         | "Prem"      | "Roi"      | "p@gmail.com"    | 52315      |
        
    
