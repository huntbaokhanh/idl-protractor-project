import { dataTest, UiElement } from "../../components/uielement";
import { ILoginParams } from "../../interface";
import { AuthNavBar } from "../generic/auth-navbar.page";
import { FooterSmall } from "../generic/footer-small.page";
import { Page } from "../page";

export class LoginPage extends Page {
    constructor(rootElement: UiElement) {
        super();
        this.rootElement = new UiElement(rootElement);
        this.url = 'auth/login'
    }

    get signInTitle(): UiElement {
        return new UiElement(this.rootElement.find(dataTest('Sign-in-title')).locator());
    }

    get emailInput(): UiElement {
        return new UiElement(this.rootElement.find(dataTest('email-input')).locator());
    }

    get passwordInput(): UiElement {
        return new UiElement(this.rootElement.find(dataTest('password-input')).locator());
    }

    get rememberMeCheckBox(): UiElement {
        return new UiElement(this.rootElement.find(dataTest('remember-me-checkbox')).locator());
    }

    get signInButton(): UiElement {
        return new UiElement(this.rootElement.find(dataTest('sign-in-button')).locator());
    }

    get forgotPasswordLink(): UiElement {
        return new UiElement(this.rootElement.find(dataTest('forgot-password-link')).locator());
    }

    get createNewAccountLink(): UiElement {
        return new UiElement(this.rootElement.find(dataTest('create-new-account-link')).locator());
    }

    async setEmail(email: string) {
        await this.emailInput.waitUntilElementVisible();
        await this.emailInput.addValue(email);
    }

    async setPassword(password: string) {
        await this.passwordInput.waitUntilElementVisible();
        await this.passwordInput.addValue(password);
    }

    get appNavBar(): AuthNavBar {
        return new AuthNavBar(new UiElement(this.rootElement.find(dataTest('app-auth-navbar')).locator()))
    }

    get appFooterSmall(): FooterSmall {
        return new FooterSmall(new UiElement(this.rootElement.find(dataTest('app-footer-small')).locator()))
    }

    async clickRememberMe() {
        await this.rememberMeCheckBox.waitUntilElementVisible();
        await this.rememberMeCheckBox.waitUntilElementToBeClickable();
        await this.rememberMeCheckBox.click();

        // Verify cái checkbox đã được chọn hay chưa
    }

    async clickSignIn() {
        await this.signInButton.waitUntilElementVisible();
        await this.signInButton.waitUntilElementToBeClickable();
        await this.signInButton.click();
    }

    async fillSignInform(loginParams: ILoginParams) {
        await this.setEmail(loginParams.email);
        await this.setPassword(loginParams.password);

        if (loginParams.rememberMe) {
            await this.clickRememberMe();
        }

        await this.clickSignIn();
    }

    async expectPageVisible(): Promise<void> {
        await this.appNavBar.expectPageVisible();
        await this.appFooterSmall.expectPageVisible();
    }

}