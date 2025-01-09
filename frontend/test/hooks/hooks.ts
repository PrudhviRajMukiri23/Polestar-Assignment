import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber'
import { chromium, Page, Browser, BrowserContext } from '@playwright/test'
import { pageFixture } from './PageFixture'
import HomePage from '../../src/pages/HomePage'
import CookieActions from '../../utils/CookieActions'
import NewsSubcribePage from '../../src/pages/NewsSubcribePage'
import Logger from '../../../utils/LoggingUtils'
import getwsEndpointBrowserStack from '../../utils/BrowserStackConfig'
import getwsEndpointLambdaTest from '../../utils/LambdaTestConfig'
import * as dotenv from 'dotenv'
dotenv.config()

let page: Page, browser: Browser, context: BrowserContext
const timestamp = new Date().toISOString().replace(/[:.-]/g, '_')
var browserPlatform = process.env.BROWSERPLATFORM // || 'BrowserStack' || 'LambdaTest'

BeforeAll(async function () {
    Logger.debug('Before All hook: Starting browser...') 
    try {
        if(process.env.LOCALBROWSER == 'true') {
            Logger.debug('Running test in local browser...')
            browser = await chromium.launch({ headless: true, channel: 'chrome' }) 
        } else if(browserPlatform == 'BrowserStack') {
            Logger.debug('Running test in browserstack browser...')
            browser = await chromium.connect({
            wsEndpoint: getwsEndpointBrowserStack()
            })
        } else if(browserPlatform == 'LambdaTest') {
            Logger.debug('Running test in lambdatest browser...')
            browser = await chromium.connect({
                wsEndpoint: getwsEndpointLambdaTest()
            })
        }
    Logger.info('Browser successfully created.')
    } catch (error) {
        Logger.error(`Error during before all hook setup: ${error.message}`)
        throw error
    }
})

AfterAll(async function () {
    Logger.debug('After all hook: Performing cleanup...')
    try {
        await browser.close()
        Logger.info('Browser successfully closed.')
    } catch (error) {
        Logger.error(`Error during cleanup before all hook: ${error.message}`)
        throw error
    } 
})

Before(async function () {
    Logger.debug('Before hook:context setup...')
    try {
        context = await browser.newContext()
        Logger.info('Context successfully created.')

        await context.tracing.start({ screenshots: true, snapshots: true })
        page = await context.newPage()
        pageFixture.page = page

        pageFixture.homePageInstance = new HomePage(pageFixture.page)
        pageFixture.cookiePageInstance = CookieActions.getInstance(pageFixture.page)
        pageFixture.newsSubcribePageInstance = new NewsSubcribePage(pageFixture.page)

        Logger.info('Page instances (HomePage, CookieActions, NewsSubcribePage) initialized.')
    } catch (error) {
        Logger.error(`Error during before hook setup: ${error.message}`)
        throw error
    }
})

After(async function ({pickle, result}) {
    Logger.debug('After hook: Performing cleanup...')
    try {
        await pageFixture.page.waitForLoadState('load')
        if(result.status == Status.FAILED) {
            const img = await pageFixture.page.screenshot({path: `./test-results/screenshots/${pickle.name}-${timestamp}`, type: 'png'}) // pickle is scenario component
            await this.attach(img, 'img/png') // attach img to cucumber
            Logger.debug('screenshot taken successfully for failed scenario...')
        }
        Logger.debug('stoping trace...')
        const traceFileName = `traces-${timestamp}.zip`
        await context.tracing.stop({ path: `./traces/${traceFileName}` })
        Logger.info(`Tracing stopped and saved as ${traceFileName}.`)

        await pageFixture.page.close()
        await context.close()

        Logger.info('Context and page successfully closed.')
    } catch (error) {
        Logger.error(`Error during cleanup in before hook: ${error.message}`)
        throw error
    }
})
