Feature: Home Page Functionality Checks

    Background: 
        Given User should navigate to 'https://www.polestar.com/se' url
        And User should handle Cookies
    
     @Smoke @Regression
     Scenario: Verify the Discover button functionality
         Given User should be on home page with title 'Polestar – Elbilar | Polestar Sverige'
        #  And Able to see 'Upptäck' button
    #     When User click on the 'Upptäck' button
    #     Then User should land on Discover page

    # @Smoke @Regression
    # Scenario: Verify the Ready For Delivery button functionality
    #     Given User should be on home page
    #     And User should able to see 'Leveransklara bilar' button
    #     When User click on the 'Leveransklara bilar' button
    #     Then User should land on Ready For Delivery page

    # @Regression
    # Scenario Outline: Verify Subcribe to News of Polestar functionality
    #     Given User should be on home page
    #     And User should able to see 'Prenumerera' button under latest news of Polestar section
    #     And User should click on 'Prenumerera' button
    #     And User should land on Subscribe to newsletter page
    #     When User fill all the details like <firstname>, <lastname>, <email> and <postnumber>
    #     And User should check the checkbox and click on 'Skicka' button
    #     Then User should verify the successful message of subcription
    # Examples: 
    #     | firstname | lastname | email          | postnumber |
    #     | prudhvi   | Raj      | abc@gmail.com  | 23456      |
    #     | Prem      | Roi      | p@gmail.com    | 52315      |
        
    
