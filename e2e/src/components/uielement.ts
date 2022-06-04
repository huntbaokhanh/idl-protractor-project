import { browser, by, ElementFinder, ExpectedConditions, Locator, promise } from "protractor";
import { logger } from "../logger";
import { SMALL_TIMEOUT } from "../timeout";

export const INVALID_EC_MESSAGE = {
    is_visible: 'Element is not visible',
    is_not_visible: 'Element is visible',
    is_clickable: 'Element is not clickable',
    is_present: 'Element is not present',
}

export const dataTest = (text: string) => { return by.css(`[data-qa="${text}"]`) };

export class UiElement {
    element: ElementFinder;

    constructor(locator: Locator) {
        this.element = browser.element(locator);
    }

    async click() {
        logger.debug(`*** Click`);
        await this.element.click();
    }

    async addValue(inputVal: string) {
        logger.debug(`*** Add Value - ${inputVal}`);
        await this.element.sendKeys(inputVal);
    }

    async clearText() {
        logger.debug(`*** Clear Text`);
        await this.element.clear();
    }

    async getText(byJS = false) {
        const text = byJS
            ? await browser.executeScript('return arguments[0].value', this.element)
            : await this.element.getText();

        logger.debug(`*** GetText - ${text}`);
        return text;
    }

    async waitUntilElementVisible() {
        logger.debug(`*** wait for this Element to be visible`);

        await browser.wait(
            ExpectedConditions.visibilityOf(this.element),
            SMALL_TIMEOUT,
            `${await this.getLocatorAsString()} - ${INVALID_EC_MESSAGE.is_visible}`
        );
    }

    async waitUntilElementPresent() {
        logger.debug(`*** wait for this Element to be present`);

        await browser.wait(
            ExpectedConditions.visibilityOf(this.element),
            SMALL_TIMEOUT,
            `${await this.getLocatorAsString()} - ${INVALID_EC_MESSAGE.is_present}`
        );
    }

    async waitUntilElementIsNotVisible() {
        logger.debug(`*** wait for this Element not to be present`);

        await browser.wait(
            ExpectedConditions.not(ExpectedConditions.visibilityOf(this.element)),
            SMALL_TIMEOUT,
            `${await this.getLocatorAsString()} - ${INVALID_EC_MESSAGE.is_not_visible}`
        );
    }

    async waitUntilElementToBeClickable() {
        logger.debug(`*** wait for this Element not to be clickable`);

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

    async isPresent() {
        const isPresent = await this.element.isPresent();
        logger.debug(`*** is Present: ${isPresent}`);
        return isPresent;
    }

    async isDisplayed() {
        const isDisplayed = await this.element.isDisplayed();

        logger.debug(`*** is Displayed: ${isDisplayed}`);
        return await this.element.isDisplayed()
    }

    find(locator: Locator) {
        logger.debug(`*** Find new locator ${locator.toString()}`);
        return new UiElement(locator);
    }

    findAll(locator: Locator) {
        logger.debug(`*** Find new locators ${locator.toString()}`);

        return this.element.all(locator);
    }

    locator() {
        return this.element.locator();
    }
}
