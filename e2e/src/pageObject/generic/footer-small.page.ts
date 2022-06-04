import { logger } from "../../logger";
import { UiElement } from "../../components/uielement";
import { Page } from "../page";

export class FooterSmall extends Page {
    rootElement: UiElement;

    constructor(rootElement: UiElement) {
        super();
        this.rootElement = new UiElement(rootElement);

        logger.warn('----Logger at FooterSmall');
    }

    async expectPageVisible(): Promise<void> {
        await this.waitForAppRootPage();
    }

}