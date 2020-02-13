import should = require('should');
import { createAppTester } from 'zapier-platform-core';
import App from '../index';
const appTester = createAppTester(App);

describe('Test authentication', () => {
    it('Should fail the validation process because of wrong credentials', async () => {
        const bundle = {
            authData: {
                login: 'user',
                password: 'secret',
                server: 'europe',
            },
        };

        try {
            const response = await appTester(App.authentication.test, bundle);
        } catch (error) {
            should(error.message).containEql('The Account Id and/or API Key you supplied is incorrect');
        }
    });

    it('Should pass the validation process ', async () => {
        const bundle = {
            authData: {
                login: '40c7d5b2-da26-4b36-84f1-8305b3aadb03',
                password: '32_xBrADOZXaB1B1JznYw0GAe8rw',
                server: 'europe',
            },
        };
        const response = await appTester(App.authentication.test, bundle);
        should(response.name).not.empty();
        should(response.isPersonal).false();
        should(response.type).equals('LSP');
    });
});
