import { Page } from "@playwright/test";
import PlaywrightActions from "../playwright-utils/PlaywrightActions";

class HomePage extends PlaywrightActions {

    private page: Page | null

    constructor(page: Page) {
        super()
        this.page = page
    }

    async navigateHomeUrl(url: string) {
        this.navigateToUrl(this.page, url)
    }

    
}

export default HomePage