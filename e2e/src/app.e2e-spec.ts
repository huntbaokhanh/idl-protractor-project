import { browser, by, protractor } from "protractor";
import { DropDownHelper } from "./components/fields/dropdown.field.helper";
import { UiElement } from "./components/uielement";

describe("Part2: Interacting to elements", async () => {
  xit("context click", async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get('/context_menu'); // Page - Navigate, back, forward, refresh

    // await browser.switchTo().alert().accept();

    // await browser.sleep(5000);

    const contentElement: UiElement = new UiElement(by.id('content'));

    await contentElement.waitUntilElementVisible();

    const hotSpotElement: UiElement = new UiElement(by.id('hot-spot'));

    await browser.actions().mouseMove(await hotSpotElement.getWebElement()).click(protractor.Button.RIGHT).perform();

    await browser.sleep(2000);
  });

  xit("Dropdown list - Normal", async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get('/dropdown');

    const contentElement: UiElement = new UiElement(by.id('content'));
    await contentElement.waitUntilElementVisible();

    // const dropdown: UiElement = new UiElement(by.css('#dropdown'));
    // await dropdown.waitUntilElementVisible();
    // await dropdown.click();

    // const option1: UiElement = new UiElement(by.css('[value="1"]'));
    // await option1.waitUntilElementVisible();
    // await option1.click();

    const dropdownOption = contentElement.find(by.tagName('select'));

    await dropdownOption.click();

    await browser.sleep(3000);
  });

  fit('Dropdown list - Using Dropdown helper', async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get('/dropdown');

    const option1 = 'Option 1';

    const contentElement: UiElement = new UiElement(by.id('content'));
    await contentElement.waitUntilElementVisible();

    const dropDownHelper = new DropDownHelper(contentElement);
    await dropDownHelper.selectElement.click();

    await dropDownHelper.getOptionByText(option1).click();

    await browser.sleep(3000);
  })

});
