import { App } from "../../../app";
import { ILoginParams } from "e2e/src/interface";

describe("Login", async () => {
    const app: App = new App();

    it('with valid credential', async () => {
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

    });

});
