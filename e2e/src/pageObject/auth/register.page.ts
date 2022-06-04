import { logger } from "../../logger";
import { dataTest, UiElement } from "../../components/uielement";
import { AuthNavBar } from "../generic/auth-navbar.page";
import { FooterSmall } from "../generic/footer-small.page";
import { Page } from "../page";
import { browser, ProtractorBrowser } from "protractor";

export class RegisterPage extends Page {
    genericBrowser: ProtractorBrowser;
    rootElement: UiElement;

    constructor(rootElement: UiElement, currentBrowser?: ProtractorBrowser) {
        super();
        this.genericBrowser = currentBrowser ? currentBrowser : browser;
        this.rootElement = new UiElement(rootElement, this.genericBrowser);
        this.url = 'auth/register';

        logger.warn('----Logger at Register page');
    }

    get appNavBar(): AuthNavBar {
        return new AuthNavBar(new UiElement(dataTest('app-auth-navbar')).locator(), this.genericBrowser);
    }

    get appFooterSmall(): FooterSmall {
        return new FooterSmall(new UiElement(dataTest('app-footer-small')).locator(), this.genericBrowser);
    }

    get nameInput(): UiElement {
        return new UiElement(this.rootElement.find(dataTest('name-input')).locator(), this.genericBrowser);
    }

    async expectPageVisible(): Promise<void> {
        await this.waitForAppRootPage();

        await this.appNavBar.expectPageVisible();
        await this.appFooterSmall.expectPageVisible();

        await expect(this.nameInput.isDisplayed()).toBe(true);
    }
}