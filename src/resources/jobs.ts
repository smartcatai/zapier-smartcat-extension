import { createJobs, Currency, SupplierType } from '../contracts/SmartcatJob';

const Jobs = {
    key: 'jobs',
    noun: 'Jobs',

    create: {
        display: {
            label: 'Create Jobs',
            description: 'Creates a new jobs.',
        },

        operation: {
            inputFields: [
                {
                    key: 'lineItems',
                    children: [
                        { key: 'email', required: true, type: 'string', label: 'Supplier email' },
                        { key: 'name', required: true, type: 'string', label: 'Supplier name' },
                        { key: 'type', required: true, choices: SupplierType, type: 'string', label: 'Supplier type' },
                        { key: 'service', required: true, type: 'string', label: 'Service type' },
                        { key: 'description', required: true, type: 'string', label: 'Job description' },
                        { key: 'unit', required: true, type: 'string', label: 'Unit type' },
                        { key: 'count', required: true, type: 'string', label: 'Unit count' },
                        { key: 'price', required: true, type: 'number', label: 'Price per unit' },
                        { key: 'currency', choices: Currency, required: true, type: 'string', label: 'Currency' },
                        { key: 'externalNumber', type: 'string', label: 'External job number' },
                    ],
                },
            ],
            perform: createJobs,
        },
    },

    // list: {
    //     display: {
    //         label: "New or Updated Job",
    //         description: "Triggers when new job is added or status of job is modified."
    //     },
    //     operation: {
    //         inputFields: [
    //             {key: "status", choices: SmartcatJobStatus, label: "Execution Status"},
    //             {key: "client", dynamic: "client.id.name", label: "Client"},
    //             {key: "validation", choices: SmartcatDocumentValidationStatus, label: "Validation Status"}
    //         ],
    //         perform: getProjects
    //     }
    // },
    //
    // search: {
    //     display: {
    //         label: "Find Projects",
    //         description: "Finds projects filtered by name and/or client name."
    //     },
    //     operation: {
    //         inputFields: [
    //             {key: "name", label:"Name"},
    //             {key: "client", dynamic: "client.id.name", label: "Client"}
    //         ],
    //         perform: searchProjects
    //     }
    // },
};

export default Jobs;
