import should = require('should');
import { createAppTester } from 'zapier-platform-core';
import App from '../index';
import { SmartcatCountry } from '../contracts/SmartcatCountry';
const appTester = createAppTester(App);

describe('Test country CRUD', () => {
    it('Should return a list of countries.', async () => {
        const bundle = {
            authData: {
                login: '40c7d5b2-da26-4b36-84f1-8305b3aadb03',
                password: '32_xBrADOZXaB1B1JznYw0GAe8rw',
                server: 'europe',
            },
        };
        const response = (await appTester(App.resources.country.list.operation.perform, bundle)) as SmartcatCountry[];
        should(response.length).greaterThan(0);
    });

    it('Should return a specific country by Id.', async () => {
        const bundle = {
            authData: {
                server: 'europe',
                login: '40c7d5b2-da26-4b36-84f1-8305b3aadb03',
                password: '32_xBrADOZXaB1B1JznYw0GAe8rw',
            },
            inputData: {
                id: 'BIH',
            },
        };
        const response = (await appTester(App.resources.country.get.operation.perform, bundle)) as SmartcatCountry;
        should(response.id).equal(bundle.inputData.id);
        should(response.name).equal('Bosnia and Herzegovina');
    });

    it('Should return a list of countries filtered by name.', async () => {
        const bundle = {
            authData: {
                server: 'europe',
                login: '40c7d5b2-da26-4b36-84f1-8305b3aadb03',
                password: '32_xBrADOZXaB1B1JznYw0GAe8rw',
            },
            inputData: {
                name: 'Bosnia and Herzegovina',
            },
        };
        const response = (await appTester(App.resources.country.search.operation.perform, bundle)) as SmartcatCountry[];
        should(response.length).equal(1);
        response.forEach(item => {
            should(item.name).equal('Bosnia and Herzegovina');
            should(item.id).equal('BIH');
        });
    });
});
