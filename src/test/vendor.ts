import should = require('should');
import { createAppTester } from 'zapier-platform-core';
import App from '../index';
import { SmartcatVendor } from '../contracts/SmartcatVendor';
const appTester = createAppTester(App);

describe('Test vendor CRUD', () => {
    it('Should return a list of vendors.', async () => {
        const bundle = {
            authData: {
                login: '40c7d5b2-da26-4b36-84f1-8305b3aadb03',
                password: '32_xBrADOZXaB1B1JznYw0GAe8rw',
                server: 'europe',
            },
        };
        const response = (await appTester(App.resources.vendor.list.operation.perform, bundle)) as SmartcatVendor[];
        should(response.length).greaterThan(0);
    });

    it('Should return a specific vendor by Id.', async () => {
        const bundle = {
            authData: {
                server: 'europe',
                login: '40c7d5b2-da26-4b36-84f1-8305b3aadb03',
                password: '32_xBrADOZXaB1B1JznYw0GAe8rw',
            },
            inputData: {
                id: '6cef606a-2847-443a-adfe-15cd2f6d542f',
            },
        };
        const response = (await appTester(App.resources.vendor.get.operation.perform, bundle)) as SmartcatVendor;
        should(response.id).equal(bundle.inputData.id);
        should(response.name).not.empty();
    });

    it('Should return a list of vendors filtered by name.', async () => {
        const bundle = {
            authData: {
                server: 'europe',
                login: '40c7d5b2-da26-4b36-84f1-8305b3aadb03',
                password: '32_xBrADOZXaB1B1JznYw0GAe8rw',
            },
            inputData: {
                name: 'Railways',
            },
        };
        const response = (await appTester(App.resources.vendor.search.operation.perform, bundle)) as SmartcatVendor[];
        should(response.length).equal(1);
        response.forEach(item => {
            should(item.name).not.empty();
            should(item.name).containEql('Railways');
            should(item.id).not.empty();
        });
    });
});
