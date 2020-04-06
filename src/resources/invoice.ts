import { getInvoices } from '../contracts/SmartcatInvoice';

const Invoice = {
    key: 'invoice',
    noun: 'Invoice',

    list: {
        display: {
            label: 'Get list of invoices',
            description: 'Get list of invoices',
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
                }
            ],
            perform: getInvoices,
        },
    },
};

export default Invoice;
