import { logger } from "../../logger";
import { dataTest, UiElement } from "../../components/uielement";
import { ILoginParams } from "../../interface";
import { AuthNavBar } from "../generic/auth-navbar.page";
import { FooterSmall } from "../generic/footer-small.page";
import { Page } from "../page";
import { browser, ProtractorBrowser } from "protractor";

export class LoginPage extends Page {
    rootElement: UiElement;
    invalidLoginData = require('../../data/auth/login.data.json');

    genericBrowser: ProtractorBrowser;

    constructor(rootElement: UiElement, currentBrowser?: ProtractorBrowser) {
        super();
        this.genericBrowser = currentBrowser ? currentBrowser : browser;
        this.rootElement = new UiElement(rootElement, this.genericBrowser);

        this.url = 'auth/login';
        logger.warn('----Logger at Login page');
    }

    get signInTitle(): UiElement {
        return new UiElement(this.rootElement.find(dataTest('Sign-in-title')).locator(), this.genericBrowser);
    }

    get emailInput(): UiElement {
        return new UiElement(this.rootElement.find(dataTest('email-input')).locator(), this.genericBrowser);
    }

    get passwordInput(): UiElement {
        return new UiElement(this.rootElement.find(dataTest('password-input')).locator(), this.genericBrowser);
    }

    get rememberMeCheckBox(): UiElement {
        return new UiElement(this.rootElement.find(dataTest('remember-me-checkbox')).locator(), this.genericBrowser);
    }

    get signInButton(): UiElement {
        return new UiElement(this.rootElement.find(dataTest('sign-in-button')).locator(), this.genericBrowser);
    }

    get forgotPasswordLink(): UiElement {
        return new UiElement(this.rootElement.find(dataTest('forgot-password-link')).locator(), this.genericBrowser);
    }

    get createNewAccountLink(): UiElement {
        return new UiElement(this.rootElement.find(dataTest('create-new-account-link')).locator(), this.genericBrowser);
    }

    get appNavBar(): AuthNavBar {
        return new AuthNavBar(new UiElement(this.rootElement.find(dataTest('app-auth-navbar')).locator()), this.genericBrowser)
    }

    get appFooterSmall(): FooterSmall {
        return new FooterSmall(new UiElement(this.rootElement.find(dataTest('app-footer-small')).locator()), this.genericBrowser)
    }

    async setEmail(email: string) {
        await this.emailInput.waitUntilElementVisible();
        await this.emailInput.clearText();
        await this.emailInput.addValue(email);
    }

    async setPassword(password: string) {
        await this.passwordInput.waitUntilElementVisible();
        await this.passwordInput.clearText();
        await this.passwordInput.addValue(password);
    }

    async clickRememberMe() {
        await this.rememberMeCheckBox.waitUntilElementVisible();
        await this.rememberMeCheckBox.waitUntilElementToBeClickable();
        await this.rememberMeCheckBox.click();
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

    async getEmailValue() {
        await this.emailInput.waitUntilElementVisible();
        return await this.emailInput.getText(true);
    }

    async getPasswordValue() {
        await this.passwordInput.waitUntilElementVisible();
        return await this.passwordInput.getText(true);
    }

    async clickPassword() {
        await this.passwordInput.waitUntilElementToBeClickable();
        await this.passwordInput.click();
    }

    // using click to another field
    async validateEmailField() {
        const invalidLoginData = require('../../data/auth/login.data.json');
        const invalidEmailArr = invalidLoginData.invalid_username.split(';');

        let actualData;

        for (const email of invalidEmailArr) {
            await this.setEmail(email);
            await this.clickPassword();

            // assert - check data
            actualData = await this.getEmailValue();

            logger.warn(`Actual: ${actualData} && Expected: ${email}`);
            expect(actualData).toEqual(email);
        }
    }

    // using Tab
    async validatePasswordField(withEmail: string) {
        let actualData;
        const invalidPasswordArr = this.invalidLoginData.invalid_password.split(';');

        await this.setEmail(withEmail);

        for (const password of invalidPasswordArr) {
            await this.setPassword(password);

            // click on Login
            await this.clickRememberMe();

            // assert - check data
            actualData = await this.getPasswordValue();

            logger.warn(`Actual: ${actualData} && Expected: ${password}`);
            expect(actualData).toEqual(password);
        }
    }

}