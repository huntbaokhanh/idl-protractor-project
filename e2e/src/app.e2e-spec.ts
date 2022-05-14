import { browser, by, protractor } from "protractor";
import { DropDownHelper } from "./components/fields/dropdown.field.helper";
import { code as dragAndDrop } from 'html-dnd';
import { UiElement } from "./components/uielement";

describe("Part2: Interacting to elements", async () => {
  it("context click", async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get('/context_menu'); // Page - Navigate, back, forward, refresh

    const contentElement: UiElement = new UiElement(by.id('content'));

    await contentElement.waitUntilElementVisible();

    const hotSpotElement: UiElement = new UiElement(by.id('hot-spot'));

    await browser.actions().mouseMove(await hotSpotElement.getWebElement()).click(protractor.Button.RIGHT).perform();

    await browser.switchTo().alert().accept();
    await browser.sleep(2000);
  });

  it("Dropdown list - Normal", async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get('/dropdown');

    const contentElement: UiElement = new UiElement(by.id('content'));
    await contentElement.waitUntilElementVisible();

    const dropdownOption = contentElement.find(by.tagName('select'));

    await dropdownOption.click();

    await browser.sleep(3000);
  });

  it('Dropdown list - Using Dropdown helper', async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get('/dropdown');

    const option1 = 'Option 1';

    const contentElement: UiElement = new UiElement(by.id('content'));
    await contentElement.waitUntilElementVisible();

    const dropDownHelper = new DropDownHelper(contentElement);
    await dropDownHelper.selectElement.click();

    await dropDownHelper.getOptionByText(option1).click();

    await browser.sleep(3000);

  });

  it('Drag& Drop', async () => {
    await browser.waitForAngularEnabled(false);
    await browser.get('/drag_and_drop');

    const contentElement: UiElement = new UiElement(by.id('content'));
    await contentElement.waitUntilElementVisible();

    const colA: UiElement = new UiElement(by.id('column-a'));
    const colB: UiElement = new UiElement(by.id('column-b'));

    await browser.executeScript(dragAndDrop, await colA.getWebElement(), await colB.getWebElement());
    await browser.sleep(3000);
  });

  it('Hover', async () => {
    // Arrange 
    const expectedUser = 'name: user1';

    // Actions: Start --------

    // 1. Navigate to hovers page
    await browser.waitForAngularEnabled(false);
    await browser.get('/hovers');

    // 2. Locate Web element(s)
    const contentElement: UiElement = new UiElement(by.id('content'));
    await contentElement.waitUntilElementVisible();

    const firstAvt: UiElement = new UiElement(by.xpath('//div[@class="figure"][1]/img'));
    const firstUserName = browser.element(by.xpath('//div[@class="figure"][1]//h5'));
    const firstUserLink: UiElement = new UiElement(by.xpath('//div[@class="figure"][1]//a'));

    // 3. Mouse move to Avt element
    await browser.actions().mouseMove(await firstAvt.getWebElement()).perform();

    // 4. Wait until the first UserLink is visible
    await firstUserLink.waitUntilElementVisible();

    // 5. Get Actual Text 
    const actualUserName = await firstUserName.getText();

    // Actions: Finished------------------
    // await firstUserLink.click();

    // Assert
    expect(expectedUser).toEqual(actualUserName);

    await browser.sleep(3000);
  });

  it('TinyMCE WYSIWYG Editor', async () => {
    const inputText = 'test ABC';
    const inputText1 = ' CDEF';

    // Actions: Start --------
    // 1. Navigate to tinymce page
    await browser.waitForAngularEnabled(false);
    await browser.get('/tinymce');

    const contentElement: UiElement = new UiElement(by.id('content'));
    await contentElement.waitUntilElementVisible();

    const iFrameElement: UiElement = new UiElement(by.tagName('iframe'));

    // 2. Switch to Iframe
    await browser.switchTo().frame(await iFrameElement.getWebElement());

    const tinymceElement: UiElement = new UiElement(by.id('tinymce'));
    // 3. Interacting to Iframe
    await tinymceElement.clearText();
    await tinymceElement.addValue(inputText);

    // 4. Trả cái content về cái browser
    await browser.switchTo().defaultContent();

    // 5. Interacting to the button (Italic)
    const italicBtn: UiElement = new UiElement(by.css('[title="Italic"]'));
    await italicBtn.waitUntilElementToBeClickable();
    await italicBtn.click();

    // 6. Keep sending value into Frame
    //  6.1 - Switch to Iframe
    await browser.switchTo().frame(await iFrameElement.getWebElement());
    await tinymceElement.addValue(inputText1);

    // Actions: completed;


    await browser.sleep(3000);

  });

  it('upload', async () => {
    // Arrange: Start
    const expectedTitle = 'File Uploaded!';
    const expectedFileName = 'fileUpload.txt';

    // const expectedWebTitle = 'The Internet';
    // Arrange: End
    const fileUploadPath = `D:/iDeaLogic/training/testautomation/demo-e2e/${expectedFileName}`;
    // Actions: Start --------
    // 1. Navigate to upload page
    await browser.waitForAngularEnabled(false);
    await browser.get('/upload');

    // 2. Wait until that content is visible
    const contentElement: UiElement = new UiElement(by.id('content'));
    await contentElement.waitUntilElementVisible();

    // 3. Get file upload element & upload Element
    const fileUploadElement: UiElement = new UiElement(by.id('file-upload'));
    await fileUploadElement.waitUntilElementVisible();
    await fileUploadElement.addValue(fileUploadPath);

    // 4. Get Click UpLoad Button Element & click on it
    const uploadButtonElement: UiElement = new UiElement(by.id('file-submit'));
    await uploadButtonElement.waitUntilElementToBeClickable();
    await uploadButtonElement.click();

    // 5. until that content is visible 
    await contentElement.waitUntilElementVisible();

    // 6. Get fileUploaded Title & GetText
    const uploadedTitleElement: UiElement = new UiElement(by.css('.example h3'));
    const actualUploadedTitle = await uploadedTitleElement.getText();

    // 7. Get uploaded file Name & Get Text
    const uploadedFileNameElement: UiElement = new UiElement((by.id('uploaded-files')));
    const actualFileName = await uploadedFileNameElement.getText();
    // Actions: Finished --------

    // Assert
    expect(expectedTitle).toEqual(actualUploadedTitle);
    expect(expectedFileName).toEqual(actualFileName);

    await browser.sleep(3000);
  })

});
