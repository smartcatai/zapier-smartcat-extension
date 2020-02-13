import * as should from 'should';
import { createAppTester } from 'zapier-platform-core';
import App from '../index';
import { SmartcatDocument, SmartcatDocumentExportType, SmartcatDocumentStatus } from '../contracts/SmartcatDocument';
import { SmartcatProject, SmartcatProjectStatus } from '../contracts/SmartcatProject';
const appTester = createAppTester(App);

function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}

describe('Test documents CRUD', () => {
    it('Should upload a new document', async () => {
        const bundle = {
            authData: {
                server: 'europe',
                login: '40c7d5b2-da26-4b36-84f1-8305b3aadb03',
                password: '32_xBrADOZXaB1B1JznYw0GAe8rw',
            },
            inputData: {
                project: '9e00164b-9040-4573-954c-27de95fa9121',
                file: 'https://www.smartcat.ai/_vuepromo_img/social.svg',
                name: `social_${getRandomInt(1000000)}.xml`,
            },
        };
        const response = (await appTester(App.resources.document.create.operation.perform, bundle)) as any;
        const documents = response.documents as SmartcatDocument[];
        for (let i = 0; i < documents.length; i++) {
            should(documents[i].id).not.null();
        }
    }).timeout(5000);

    it('Should update a existing document', async () => {
        const bundle = {
            authData: {
                server: 'europe',
                login: '40c7d5b2-da26-4b36-84f1-8305b3aadb03',
                password: '32_xBrADOZXaB1B1JznYw0GAe8rw',
            },
            inputData: {
                document: 'b42aacd1bffadd1bb54f1bf0_94',
                file: 'https://www.smartcat.ai/_vuepromo_img/social.svg',
                name: `social_${getRandomInt(1000000)}.xml`,
            },
        };
        const response = (await appTester(App.creates.update_document.operation.perform, bundle)) as any;
        const documents = response.documents as SmartcatDocument[];
        for (let i = 0; i < documents.length; i++) {
            should(documents[i].id).not.null();
        }
    }).timeout(5000);

    it('Should export a translated document', async () => {
        const bundle = {
            authData: {
                server: 'europe',
                login: '40c7d5b2-da26-4b36-84f1-8305b3aadb03',
                password: '32_xBrADOZXaB1B1JznYw0GAe8rw',
            },
            inputData: {
                id: 'e14e06a4e1f91d60fc572b4c_12',
                exportType: SmartcatDocumentExportType.target,
            },
        };
        const response = (await appTester(App.creates.export_document.operation.perform, bundle)) as any;
        should(response.file).not.null();
    }).timeout(5000);

    it('Should return the list of the documents created by client', async () => {
        const bundle = {
            authData: {
                login: '40c7d5b2-da26-4b36-84f1-8305b3aadb03',
                password: '32_xBrADOZXaB1B1JznYw0GAe8rw',
                server: 'europe',
            },
            inputData: {
                status: null,
                client: '0ee23155-afbc-429d-bff7-9ac753e0275d',
                project: null,
            },
        };
        const response = (await appTester(App.resources.document.list.operation.perform, bundle)) as SmartcatDocument[];
        should(response.length).greaterThan(0);
    }).timeout(10000);

    it('Should return the list of the translating documents', async () => {
        const bundle = {
            authData: {
                login: '40c7d5b2-da26-4b36-84f1-8305b3aadb03',
                password: '32_xBrADOZXaB1B1JznYw0GAe8rw',
                server: 'europe',
            },
            inputData: {
                status: SmartcatDocumentStatus.inProgress,
                client: null,
                project: null,
            },
        };
        const response = (await appTester(App.resources.document.list.operation.perform, bundle)) as SmartcatDocument[];
        should(response.length).greaterThan(0);
        for (let i = 0; i < response.length; i++) {
            should(response[i].status).equal(SmartcatDocumentStatus.inProgress);
        }
    }).timeout(10000);
});
