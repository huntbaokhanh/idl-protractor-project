import { browser, ProtractorBrowser } from "protractor";
import { UiElement } from "../components/uielement";
import { logger } from "../logger";

export abstract class Page {
    abstract rootElement: UiElement;
    abstract expectPageVisible(): Promise<void>;

    title: string;
    url: string;

    async navigate() {
        const uri = `${browser.baseUrl}${this.url}`;
        logger.info(`The current URL is: ${uri}`);

        await browser.get(`${uri}`);
    }

    async waitForAppRootPage() {
        await this.rootElement.waitUntilElementPresent();
        await this.rootElement.waitUntilElementVisible();
    }
}