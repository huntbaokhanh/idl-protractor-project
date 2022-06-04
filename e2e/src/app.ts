import { browser, by, ProtractorBrowser } from "protractor";
import { UiElement } from "./components/uielement";
import { LoginPage } from "./pageObject/auth/login.page";
import { RegisterPage } from "./pageObject/auth/register.page";

export class App {
    genericBrowser: ProtractorBrowser;

    constructor(currentBrowser?: ProtractorBrowser) {
        this.genericBrowser = currentBrowser ? currentBrowser : browser;
    }

    get login(): LoginPage { return new LoginPage(new UiElement(by.tagName('app-login')).locator(), this.genericBrowser); }
    get register(): RegisterPage { return new RegisterPage(new UiElement(by.tagName('app-register')).locator(), this.genericBrowser); }
}