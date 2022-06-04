import { logger } from "../../logger";
import { UiElement } from "../../components/uielement";
import { Page } from "../page";
import { browser, ProtractorBrowser } from "protractor";

export class PageDropdown extends Page {
    genericBrowser: ProtractorBrowser;
    rootElement: UiElement;

    constructor(rootElement: UiElement, currentBrowser?: ProtractorBrowser) {
        super();
        this.genericBrowser = currentBrowser ? currentBrowser : browser;

        this.rootElement = new UiElement(rootElement);

        logger.warn('----Logger at PageDropdown');
    }

    async expectPageVisible(): Promise<void> {
        await this.waitForAppRootPage();
    }

}