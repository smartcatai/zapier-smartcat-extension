import should = require("should");
import { createAppTester } from "zapier-platform-core";
import App from "../index";
import {SmartcatProject, SmartcatProjectStatus} from "../contracts/SmartcatProject";
import {SmartcatDocumentValidationStatus} from "../contracts/SmartcatDocument";
const appTester = createAppTester(App);

describe("Test project CRUD", () => {

    it("Should return the list of created projects", async () => {
        const bundle = {
            authData: {
                login: "40c7d5b2-da26-4b36-84f1-8305b3aadb03",
                password: "32_xBrADOZXaB1B1JznYw0GAe8rw",
                server: "europe"
            },
            inputData: {
                status: SmartcatProjectStatus.created,
                client: null,
                validation: null,
            }
        };
        const response = await appTester(App.resources.project.list.operation.perform, bundle) as SmartcatProject[];
        should(response.length).greaterThan(0);
        for (let i = 0; i < response.length; i++){
            should(response[i].status).equal(SmartcatProjectStatus.created);
        }
    }).timeout(10000);

    it("Should return the list of the client's projects", async () => {
        const bundle = {
            authData: {
                login: "40c7d5b2-da26-4b36-84f1-8305b3aadb03",
                password: "32_xBrADOZXaB1B1JznYw0GAe8rw",
                server: "europe"
            },
            inputData: {
                status: null,
                client: "0ee23155-afbc-429d-bff7-9ac753e0275d",
                validation: null
            }
        };
        const response = await appTester(App.resources.project.list.operation.perform, bundle) as SmartcatProject[];
        should(response.length).greaterThan(0);
        for (let i = 0; i < response.length; i++){
            should(response[i].clientId).equal("0ee23155-afbc-429d-bff7-9ac753e0275d");
        }
    }).timeout(10000);

    it("Should return the projects contain invalid files", async () => {
        const bundle = {
            authData: {
                login: "40c7d5b2-da26-4b36-84f1-8305b3aadb03",
                password: "32_xBrADOZXaB1B1JznYw0GAe8rw",
                server: "europe"
            },
            inputData: {
                status: null,
                client: null,
                validation: SmartcatDocumentValidationStatus.error
            }
        };
        const response = await appTester(App.resources.project.list.operation.perform, bundle) as SmartcatProject[];
        should(response.length).greaterThan(0);
        for (let i = 0; i < response.length; i++){
            let any = response[i].documents.find(value => value.documentDisassemblingStatus == SmartcatDocumentValidationStatus.error);
            should(any).not.undefined();
        }
    }).timeout(10000);

    it("Should return the list of the projects created by client", async () => {
        const bundle = {
            authData: {
                login: "40c7d5b2-da26-4b36-84f1-8305b3aadb03",
                password: "32_xBrADOZXaB1B1JznYw0GAe8rw",
                server: "europe"
            },
            inputData: {
                status: SmartcatProjectStatus.created,
                client: "0ee23155-afbc-429d-bff7-9ac753e0275d",
                validation: null
            }
        };
        const response = await appTester(App.resources.project.list.operation.perform, bundle) as SmartcatProject[];
        should(response.length).greaterThan(0);
        for (let i = 0; i < response.length; i++){
            should(response[i].clientId).equal("0ee23155-afbc-429d-bff7-9ac753e0275d");
            should(response[i].status).equal(SmartcatProjectStatus.created);
        }
    }).timeout(10000);

    it("Should create a new project", async () => {
        const bundle = {
            authData: {
                server: 'europe',
                login: '40c7d5b2-da26-4b36-84f1-8305b3aadb03',
                password: '32_xBrADOZXaB1B1JznYw0GAe8rw'
            },
            inputData: {
                name: 'Smith Family project',
                sourceLanguage: 'ru',
                targetLanguages: ['en']
            }
        };
        const project = App.resources.project as any;
        const response = await appTester(project.create.operation.perform, bundle as any) as SmartcatProject;
        should(response.name).containEql(bundle.inputData.name);
        should(response.sourceLanguage).equals(bundle.inputData.sourceLanguage);
    }).timeout(5000);

    it("Should return the project by id", async () => {
        const bundle = {
            authData: {
                login: "40c7d5b2-da26-4b36-84f1-8305b3aadb03",
                password: "32_xBrADOZXaB1B1JznYw0GAe8rw",
                server: "europe"
            },
            inputData: {
                id: '7c5afef8-fab3-48f0-8b25-c9e5dd3c5f95'
            }
        };
        const response = await appTester(App.resources.project.get.operation.perform, bundle) as SmartcatProject;
        should(response.id).equals('7c5afef8-fab3-48f0-8b25-c9e5dd3c5f95');
    }).timeout(10000);
});
