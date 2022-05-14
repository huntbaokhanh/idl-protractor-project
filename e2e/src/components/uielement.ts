import { browser, ElementFinder, ExpectedConditions, Locator } from "protractor";
import { SMALL_TIMEOUT } from "../timeout";

export const INVALID_EC_MESSAGE = {
    is_visible: 'Element is not visible',
    is_not_visible: 'Element is visible',
    is_clickable: 'Element is not clickable',
}

export class UiElement {
    element: ElementFinder;

    constructor(locator: Locator) {
        this.element = browser.element(locator);
    }

    async click() {
        await this.element.click();

        console.log(`UI Element ${await this.getLocatorAsString()} - Click`);
    }

    async addValue(inputVal: string) {
        await this.element.sendKeys(inputVal);
    }

    async clearText() {
        await this.element.clear();
    }

    async getText() {
        const text = await this.element.getText();

        console.log(`Get - ${text}`);
        return text;
    }

    async waitUntilElementVisible() {
        console.log(`UI Element ${await this.getLocatorAsString()}- waitUntilElementVisible`);

        await browser.wait(
            ExpectedConditions.visibilityOf(this.element),
            SMALL_TIMEOUT,
            `${await this.getLocatorAsString()} - ${INVALID_EC_MESSAGE.is_visible}`
        );
    }

    async waitUntilElementIsNotVisible() {
        await browser.wait(
            ExpectedConditions.not(ExpectedConditions.visibilityOf(this.element)),
            SMALL_TIMEOUT,
            `${await this.getLocatorAsString()} - ${INVALID_EC_MESSAGE.is_not_visible}`
        );
    }

    async waitUntilElementToBeClickable() {
        await browser.wait(
            ExpectedConditions.elementToBeClickable(this.element),
            SMALL_TIMEOUT,
            `${await this.getLocatorAsString()} - ${INVALID_EC_MESSAGE.is_clickable}`
        );
    }

    async getLocatorAsString() {
        return await this.element.locator().toString();
    }

    async getWebElement() {
        return await this.element.getWebElement();
    }

    find(locator: Locator) {
        return new UiElement(locator);
    }

    findAll(locator: Locator) {
        return this.element.all(locator);
    }

    locator() {
        return this.element.locator();
    }
}