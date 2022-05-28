import { dataTest, UiElement } from "../../components/uielement";
import { AuthNavBar } from "../generic/auth-navbar.page";
import { FooterSmall } from "../generic/footer-small.page";
import { Page } from "../page";

export class RegisterPage extends Page {
    constructor(rootElement: UiElement) {
        super();
        this.rootElement = new UiElement(rootElement);
        this.url = 'auth/register'
    }

    get appNavBar(): AuthNavBar {
        return new AuthNavBar(new UiElement(this.rootElement.find(dataTest('app-auth-navbar')).locator()))
    }

    get appFooterSmall(): FooterSmall {
        return new FooterSmall(new UiElement(this.rootElement.find(dataTest('app-footer-small')).locator()))
    }

    get nameInput(): UiElement {
        return new UiElement(this.rootElement.find(dataTest('name-input')));
    }

    async expectPageVisible(): Promise<void> {
        await this.appNavBar.expectPageVisible();
        await this.appFooterSmall.expectPageVisible();

        await expect(this.nameInput.isDisplayed).toBe(true);
    }
}