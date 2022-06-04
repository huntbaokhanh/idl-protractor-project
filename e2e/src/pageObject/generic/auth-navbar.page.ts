import { logger } from "../../logger";
import { dataTest, UiElement } from "../../components/uielement";
import { Page } from "../page";
import { PageDropdown } from "./page-dropdown.page";
import { browser, ProtractorBrowser } from "protractor";

export class AuthNavBar extends Page {
    genericBrowser: ProtractorBrowser;
    rootElement: UiElement;

    constructor(rootElement: UiElement, currentBrowser?: ProtractorBrowser) {
        super();
        this.genericBrowser = currentBrowser ? currentBrowser : browser;
        this.rootElement = new UiElement(rootElement);

        logger.warn('----Logger at AuthNavBar');
    }

    get notusAngularBrand() {
        return new UiElement(this.rootElement.find(dataTest('Notus-angular-brand')).locator(), this.genericBrowser);
    }

    get createTeamDocsLink() {
        return new UiElement(this.rootElement.find(dataTest('creative-tim-docs-link')).locator(), this.genericBrowser);
    }

    get pageDropDown(): PageDropdown {
        return new PageDropdown(new UiElement(dataTest('app-pages-dropdown')).locator(), this.genericBrowser)
    }

    async expectPageVisible() {
        await this.waitForAppRootPage();

        await expect(this.notusAngularBrand.isDisplayed()).toBe(true);
        await expect(this.createTeamDocsLink.isDisplayed()).toBe(true);
        await this.pageDropDown.expectPageVisible();
    }
}