import should = require('should');
import { createAppTester } from 'zapier-platform-core';
import App from '../index';
import { SmartcatInvoice } from '../contracts/SmartcatInvoice';
const appTester = createAppTester(App);

describe('Test Invoice CRUD', () => {
    it('Should return a list of invoices.', async () => {
        const bundle = {
            authData: {
                login: '40c7d5b2-da26-4b36-84f1-8305b3aadb03',
                password: '69_cJKRFLgL4n9SWtBLi0e35KkPr',
                server: 'europe',
            },
            inputData: {
                dateCreatedFrom: '2019-01-01T08:54:32.732Z',
                dateCreatedTo: '2020-03-02T08:54:32.732Z',
            },
        };
        const response = (await appTester(App.resources.invoice.list.operation.perform, bundle)) as SmartcatInvoice[];
        should(response.length).greaterThan(0);
    });
});
