import should = require("should");
import { createAppTester } from "zapier-platform-core";
import App from "../index";
import {SmartcatClient} from "../contracts/SmartcatClient";
const appTester = createAppTester(App);

describe("Test client CRUD", () => {

    it("Should return a list of clients", async () => {
        const bundle = {
            authData: {
                login: "40c7d5b2-da26-4b36-84f1-8305b3aadb03",
                password: "32_xBrADOZXaB1B1JznYw0GAe8rw",
                server: "europe"
            }
        };
        const response = await appTester(App.resources.client.list.operation.perform, bundle) as SmartcatClient[];
        should(response.length).greaterThan(0);
    });

    it("Should return the client by Id.", async () => {
        const bundle = {
            authData: {
                server: 'europe',
                login: '40c7d5b2-da26-4b36-84f1-8305b3aadb03',
                password: '32_xBrADOZXaB1B1JznYw0GAe8rw'
            },
            inputData: {
                id: '0ee23155-afbc-429d-bff7-9ac753e0275d'
            }
        };
        const response = await appTester(App.resources.client.get.operation.perform, bundle) as SmartcatClient;
        should(response.id).equal(bundle.inputData.id);
        should(response.name).not.empty();
    });

    it("Should return a list of clients filtered by name.", async () => {
        const bundle = {
            authData: {
                server: 'europe',
                login: '40c7d5b2-da26-4b36-84f1-8305b3aadb03',
                password: '32_xBrADOZXaB1B1JznYw0GAe8rw'
            },
            inputData: {
                name: 'Netflix'
            }
        };
        const response = await appTester(App.resources.client.search.operation.perform, bundle) as SmartcatClient[];
        should(response.length).equal(1);
        response.forEach(item => {
            should(item.name).not.empty();
            should(item.name).containEql('Netflix');
            should(item.id).equal('0ee23155-afbc-429d-bff7-9ac753e0275d');
        });
    });
});
