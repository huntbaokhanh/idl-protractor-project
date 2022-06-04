import { logger } from "../../logger";
import { dataTest, UiElement } from "../../components/uielement";
import { AuthNavBar } from "../generic/auth-navbar.page";
import { FooterSmall } from "../generic/footer-small.page";
import { Page } from "../page";

export class RegisterPage extends Page {
    rootElement: UiElement;

    constructor(rootElement: UiElement) {
        super();
        this.rootElement = new UiElement(rootElement);
        this.url = 'auth/register';

        logger.warn('----Logger at Register page');
    }

    get appNavBar(): AuthNavBar {
        return new AuthNavBar(new UiElement(dataTest('app-auth-navbar')).locator());
    }

    get appFooterSmall(): FooterSmall {
        return new FooterSmall(new UiElement(dataTest('app-footer-small')).locator());
    }

    get nameInput(): UiElement {
        return new UiElement(this.rootElement.find(dataTest('name-input')).locator());
    }

    async expectPageVisible(): Promise<void> {
        await this.waitForAppRootPage();

        await this.appNavBar.expectPageVisible();
        await this.appFooterSmall.expectPageVisible();

        await expect(this.nameInput.isDisplayed()).toBe(true);
    }
}