import { by } from "protractor";
import { UiElement } from "../uielement";

export class ButtonHelper {
    parentElement: UiElement;
    getTypeByCSS = by.css('[type="submit"]');
    getClassByCSS = by.css('[class="button"]');
    getByTitle = (title: string) => by.css(`[title="${title}"]`);

    constructor(parentLocator: UiElement) {
        this.parentElement = new UiElement(parentLocator);
    }

    getBtnByTitle(title: string) {
        return new UiElement(this.parentElement.find(this.getByTitle(title)).locator());
    }
}