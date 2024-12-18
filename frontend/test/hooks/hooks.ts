import { Before, After } from '@cucumber/cucumber';
import { chromium, Page, Browser, BrowserContext } from '@playwright/test';
import { pageFixture } from './PageFixture';
import HomePage from '../../src/pages/HomePage';
import CookieActions from '../../utils/CookieActions';
import NewsSubcribePage from '../../src/pages/NewsSubcribePage';
import Logger from '../../../utils/LoggingUtils';

let page: Page, browser: Browser, context: BrowserContext;

Before(async function () {
    Logger.debug('Before hook: Starting browser and context setup...');

    try {
        browser = await chromium.launch({ headless: false, channel: 'chrome' });
        context = await browser.newContext();
        Logger.info('Browser and context successfully created.');

        await context.tracing.start({ screenshots: true, snapshots: true });
        page = await context.newPage();
        pageFixture.page = page;

        pageFixture.homePageInstance = new HomePage(pageFixture.page);
        pageFixture.cookiePageInstance = CookieActions.getInstance(pageFixture.page);
        pageFixture.newsSubcribePageInstance = new NewsSubcribePage(pageFixture.page);

        Logger.info('Page instances (HomePage, CookieActions, NewsSubcribePage) initialized.');
    } catch (error) {
        Logger.error(`Error during browser setup: ${error.message}`);
        throw error;
    }
});

After(async function () {
    Logger.debug('After hook: Performing cleanup...');

    try {
        await pageFixture.page.waitForLoadState('load');
        Logger.debug('Page fully loaded, stopping tracing...');
        
        const timestamp = new Date().toISOString().replace(/[:.-]/g, '_');
        const traceFileName = `traces-${timestamp}.zip`;

        await context.tracing.stop({ path: `./traces/${traceFileName}` });
        Logger.info(`Tracing stopped and saved as ${traceFileName}.`);

        await pageFixture.page.close();
        await page.close();
        await context.close();
        await browser.close();

        Logger.info('Browser, context, and page successfully closed.');
    } catch (error) {
        Logger.error(`Error during cleanup: ${error.message}`);
        throw error;
    }
});
