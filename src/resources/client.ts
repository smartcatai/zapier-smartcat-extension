import { getClient, getClients, searchClients } from '../contracts/SmartcatClient';

const Client = {
    key: 'client',
    noun: 'Client',

    get: {
        display: {
            label: 'Get Client',
            description: 'Gets an existing client.',
        },
        operation: {
            inputFields: [{ key: 'id', dynamic: 'client.id.name', required: true, label: 'Id' }],
            perform: getClient,
        },
    },

    list: {
        display: {
            label: 'New or Updated Client',
            description: 'Triggers when a new client is created or the existing one is modified at Smartcat account.',
        },
        operation: {
            perform: getClients,
        },
    },

    search: {
        display: {
            label: 'Find Clients',
            description: 'Finds a list of clients filtered by name.',
        },
        operation: {
            inputFields: [{ key: 'name', required: true, type: 'string', label: 'Name' }],
            perform: searchClients,
        },
    },

    sample: {
        id: 1,
        name: 'This is sample name',
    },
};

export default Client;
