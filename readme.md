# Polestar QA Tests

## Pre-requisites

### Below applications to be installed

- node.js [https://nodejs.org/en/download/package-manager]
- vs code [https://code.visualstudio.com/download]
- k6 [https://grafana.com/docs/k6/latest/set-up/install-k6/]
- playwright (install typescript) [https://www.npmjs.com/package/playwright]
- cucumber [https://www.npmjs.com/package/@cucumber/cucumber/v/9.5.1]
- cucumber plugin in vscode [https://marketplace.visualstudio.com/items?itemName=CucumberOpen.cucumber-official]
- multiple cucumber html reporter [https://github.com/WasiqB/multiple-cucumber-html-reporter]
- ts-node [https://www.npmjs.com/package/node-ts]

### Actions Points Covered

1. Added the **frontend**, **backend** and **k6** test cases.
2. Implemented in **Page Object Model** and **Behavioral-Driven**.
3. Implemented **Singleton class** file to serve single instance at at time.
4. Handled the **parallel** execution.
5. configured **gitHub Actions yaml** with artifacts publish feature.
6. **Reports** and **traces** generated and published in pipeline.
7. Custom **logging** and **Error handling** were implemented.

## Frontend Tests

This project consists on the frontend test cases on the link https://www.polestar.com/se

- Validated the testcases to test the discover and ready for delivery links check.
- Validated the subcription of news process for Polestar.

### Command to run the frontend test

```
npm test-ui
```
### Custom Execution (using tags)

- I have included the 'tag' parameter to couple of test cases. Given value as '@smoke'.
- We can run that two specific test cases by using the tag '--grep' as shown in below command.

```
npm test-ui-smoke

npm test-ui-regression
```

### Retry Execution of faied tests

- I have included the retry mechanism to rety the failed test cases in local as well as pipeline
- command to achieve running of failed test cases

```
npm run test-ui:failed
```

### Custom reports generation

- I have included the utility file to parse the cucumber report with custom data and pie-charts
- command to achieve custom reports of UI test cases
- It will generate _index.html_ report file under _test-results_ folder

```
ui-report-gen
```
![alt text](readme-images/image.png)
![alt text](readme-images/image-1.png)
![alt text](readme-images/image-2.png)

## Backend Test

This project consists on the backend test cases on the link https://reqres.in/

- Implemented the test cases with GET, POST, PUT and DELETE http methods.
- Implemented the request specifications in RequestSpec.ts file in utils.
- In RequestSpec.ts file we can customize the request specifications.

### Command to run the backend test

```
npm test-api
```

## k6-performance Test

This project consists on the k6 performance test case on the link https://www.polestar.com/se/test-drive/booking/ps4/

- Implemented the GET call performance test case with virtual users of 25vu.

### Running k6 test

- Run the below commans to run script.js for windows run

```
npm test-k6
```
![alt text](<readme-images/image copy.png>)

## GitHub Actions

- I have integrated the github action pipeline also. pipeline-triggr.yml is provided under './github/workflows' path. I have published the artifactes and reports in pipleline.

![alt text](readme-images/image-3.png)

## Playwright Traces

- I have included the amazing feature of playwright i.e., playwright traces.
- We can find it in following path 'traces'
- files will get saved with time date and test case number.
- In pipeline we can download traces from the artifacts and view the traces.

### Playwright Traces View

- There are two different ways to view the traces.
  1. We can upload the 'trace***.zip' file in the following link: https://trace.playwright.dev/

  2. If playwright is installed in the local system we can go to the 'trace***.zip' location and run the below command
  
    ```
    npx playwright show-trace <tracefilename.zip>
    ```  
![alt text](readme-images/image4.png)

### Custom logging and Error Handling

- I have used _winston_ library of npm to have custom logging. Handled the generic util file for logging configuration.
- Below are the libraries that are used:
    ```
    npm i winston

    npm i moment-timezone
    ```  
- All test cases use the generic logging util file and log in console, and test_run.log_ file under Logging folder.
- I have used _ErrorHandler_ for BE test cases to handled any unexpected error while interacting api's.

- ref: 
  winston - logging [https://www.npmjs.com/package/winston]
  
  time zone - moment timezone [https://www.npmjs.com/package/moment-timezone]

  ![alt text](readme-images/image-4.png)
  ![alt text](readme-images/image-5.png)
  ![alt text](readme-images/image-6.png)

### Tech stack used

- Node.js
- Playwright
- JavaScript
- TypeScript
- k6
- yaml
- Cucumber
- Gherkin





