import { browser } from "protractor";
import { UiElement } from "../components/uielement";

export abstract class Page {
    title: string;
    url: string;
    rootElement: UiElement;

    abstract expectPageVisible(): Promise<void>;

    async navigate() {
        const uri = `${browser.baseUrl}${this.url}`;
        console.log(`The current URL is: ${uri}`);
        await browser.get(`${uri}`);
    }
}