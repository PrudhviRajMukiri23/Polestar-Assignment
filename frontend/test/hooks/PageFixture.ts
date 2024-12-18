import { Page } from '@playwright/test';
import HomePage from '../../src/pages/HomePage';
import CookieActions from '../../utils/CookieActions';
import NewsSubcribePage from '../../src/pages/NewsSubcribePage';

export const pageFixture = {
    page: null as Page,
    homePageInstance: null as HomePage,
    cookiePageInstance: null as CookieActions,
    newsSubcribePageInstance: null as NewsSubcribePage
};
