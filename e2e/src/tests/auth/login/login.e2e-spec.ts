import { browser } from "protractor";
import { App } from "../../../app";
import { ILoginParams } from "../../../interface";
import { finishedTest, startTest } from "../../../logger";

describe("Login", async () => {
    const browser2 = browser.forkNewDriverInstance();
    const app: App = new App();
    const app2 = new App(browser2);

    const validEmail = 'khanh@gmail.com';

    beforeAll(async () => {
        await app.login.navigate();
        await app2.login.navigate();
    });

    afterEach(() => {
        finishedTest();
    })

    it('with invalid credential - userName', async () => {
        startTest('with invalid credential - userName');

        await Promise.all(
            [
                app.login.validateEmailField(),
                app2.login.validateEmailField()
            ]
        )
    });

    it('with invalid credential - password', async () => {
        startTest('with invalid credential - password');

        await Promise.all(
            [
                app.login.validatePasswordField(validEmail),
                app2.login.validatePasswordField(validEmail)
            ]
        )
    });

    it('with valid credential', async () => {
        startTest('Login - with valid credential');
        // arrange
        const loginParams: ILoginParams = {
            email: 'khanh@gmail.com',
            password: 'Data123',
            rememberMe: true
        }

        // action
        await app.login.navigate();
        await app.login.fillSignInform(loginParams);

        // Assert steps
        await app.register.navigate();
        await app.register.expectPageVisible();

        finishedTest('Login - with valid credential');
    });

});
