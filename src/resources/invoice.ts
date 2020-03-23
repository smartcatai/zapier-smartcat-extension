import { getInvoices } from '../contracts/SmartcatInvoice';

const Invoice = {
    key: 'invoice',
    noun: 'Invoice',

    list: {
        display: {
            label: 'Get list of invoices',
            description: 'Get list of invoces in sselected dates range',
            // hidden: true,
        },
        operation: {
            inputFields: [
                {
                    key: 'dateCreatedFrom',
                    required: true,
                    type: 'datetime',
                    label: 'Start date',
                    helpText: 'Start date of invoice search range',
                },
                {
                    key: 'dateCreatedTo',
                    required: true,
                    type: 'datetime',
                    label: 'End date',
                    helpText: 'End date of invoice search range',
                },
                // { key: 'limit', required: false, type: 'integer', label: 'Limit' },
                // { key: 'skip', required: false, type: 'integer', label: 'Skip' },
            ],
            perform: getInvoices,
        },
    },
};

export default Invoice;
