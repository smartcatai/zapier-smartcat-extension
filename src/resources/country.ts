import { getCountry, getCountries, searchCountries } from '../contracts/SmartcatCountry';

const Country = {
    key: 'country',
    noun: 'Country',

    get: {
        display: {
            label: 'Get Country',
            description: 'Gets an existing country.',
            hidden: true,
        },
        operation: {
            inputFields: [{ key: 'id', required: true, type: 'string', label: 'Id' }],
            perform: getCountry,
        },
    },

    list: {
        display: {
            label: 'New Country',
            description: 'Triggers when the new country is added at Smartcat.',
            hidden: true,
        },
        operation: {
            perform: getCountries,
        },
    },

    search: {
        display: {
            label: 'Find Countries',
            description: 'Finds countries filtered by name.',
            hidden: true,
        },
        operation: {
            inputFields: [{ key: 'name', required: true, type: 'string', label: 'Name' }],
            perform: searchCountries,
        },
    },
};

export default Country;
