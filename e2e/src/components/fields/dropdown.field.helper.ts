import { by } from "protractor";
import { UiElement } from "../uielement";

export class DropDownHelper {
    parentElement: UiElement;
    private selectLocator = by.tagName('select');
    private optionSelector = by.tagName('option');
    private optionByText = (text: string) => by.xpath(`//option[text()="${text}"]`);
    private optionContainsText = (text: string) => by.xpath(`//option[text()="${text}"]`);

    constructor(parentLocator: UiElement) {
        this.parentElement = new UiElement(parentLocator);
    }

    get selectElement(): UiElement {
        return new UiElement(this.parentElement.find(this.selectLocator).locator());
    }

    get allOptionElements(): UiElement {
        return new UiElement(this.parentElement.findAll(this.optionSelector).locator());
    }

    getOptionByText(text: string): UiElement {
        return new UiElement(this.parentElement.find(this.optionByText(text)).locator());
    }

    getOptionContainsText(text: string): UiElement {
        return new UiElement(this.parentElement.find(this.optionContainsText(text)).locator());
    }

}