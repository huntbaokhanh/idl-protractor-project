import { App } from "../../../app";
import { finishedTest, startTest } from "../../../logger";

describe("Register", async () => {
    const app: App = new App();

    const validEmail = 'khanh@gmail.com';

    beforeAll(async () => {
        await app.login.navigate();
    });

    afterEach(() => {
        finishedTest();
    })

    it('[TC 001] Register abc', async () => {
        startTest('[TC 001] Register abc');
        await app.login.validateEmailField();
    });

    it('[TC 002] Register zxcxcz', async () => {
        startTest('[TC 002] Register zxcxcz');
        await app.login.validatePasswordField(validEmail);
    });

});
