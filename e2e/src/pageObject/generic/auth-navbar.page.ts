import { dataTest, UiElement } from "../../components/uielement";
import { Page } from "../page";
import { PageDropdown } from "./page-dropdown.page";

export class AuthNavBar extends Page {
    constructor(rootElement: UiElement) {
        super();
        this.rootElement = new UiElement(rootElement);
    }

    get notusAngularBrand() {
        return new UiElement(this.rootElement.find(dataTest('Notus-angular-brand')).locator());
    }

    get createTeamDocsLink() {
        return new UiElement(this.rootElement.find(dataTest('creative-tim-docs-link')).locator());
    }

    get pageDropDown(): PageDropdown {
        return new PageDropdown(new UiElement(this.rootElement.find(dataTest('app-pages-dropdown')).locator()))
    }

    async expectPageVisible() {
        // authNavbar
        // Todo
        // await expect(this.rootElement.isPresent()).toBe(true);

        await expect(this.notusAngularBrand.isDisplayed()).toBe(true);
        await expect(this.createTeamDocsLink.isDisplayed()).toBe(true);

        await this.pageDropDown.expectPageVisible();
    }
}