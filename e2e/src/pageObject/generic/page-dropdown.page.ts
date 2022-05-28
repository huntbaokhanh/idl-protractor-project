import { UiElement } from "../../components/uielement";
import { Page } from "../page";

export class PageDropdown extends Page {
    constructor(rootElement: UiElement) {
        super();
        this.rootElement = new UiElement(rootElement);
    }

    async expectPageVisible(): Promise<void> {
        // Todo
        // await expect(this.rootElement.isPresent()).toBe(true);
    }

}