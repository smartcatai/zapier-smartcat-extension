// import { getInvoices } from '../contracts/SmartcatInvoice';
//
// const Invoice = {
//     key: 'invoice',
//     noun: 'Invoice',
//
//     list: {
//         display: {
//             label: 'Get List of Invoices',
//             description: 'Triggers when the new Invoice is added at Smartcat.',
//         },
//         operation: {
//             inputFields: [
//                 {
//                     key: 'dateCreatedFrom',
//                     required: true,
//                     type: 'datetime',
//                     label: 'Start date',
//                     helpText: 'Start date of invoice search range',
//                 },
//                 {
//                     key: 'dateCreatedTo',
//                     required: true,
//                     type: 'datetime',
//                     label: 'End date',
//                     helpText: 'End date of invoice search range',
//                 },
//             ],
//             perform: getInvoices,
//         },
//     },
//
//     sample: {
//         number: 'string',
//         currency: 'string',
//         cost: 0,
//         date: '2021-01-28T14:54:38.672Z',
//         status: 'sent',
//         payerRequisites: {
//             name: 'string',
//             contactPerson: 'string',
//             vat: 'string',
//             legalAddress: 'string',
//             country: 'string',
//         },
//         payeeRequisites: {
//             registrationNumber: 'string',
//             beneficiary: 'string',
//             bankName: 'string',
//             bankAddress: 'string',
//             bankCode: 'string',
//             swift: 'string',
//             bankAccount: 'string',
//             achRoutingNumber: 'string',
//             wireRoutingNumber: 'string',
//             transitNumber: 'string',
//             bankCorrAccount: 'string',
//             bankCorrBankEn: 'string',
//             bankCorrBankRu: 'string',
//             iban: 'string',
//             kpp: 'string',
//             bic: 'string',
//             name: 'string',
//             contactPerson: 'string',
//             vat: 'string',
//             legalAddress: 'string',
//             country: 'string',
//         },
//         jobs: [
//             {
//                 id: 'string',
//                 invoiceNumber: 'string',
//                 supplierEmail: 'string',
//                 supplierName: 'string',
//                 supplierType: 'freelancer',
//                 serviceType: 'string',
//                 jobDescription: 'string',
//                 unitsType: 'string',
//                 unitsAmount: 0,
//                 pricePerUnit: 0,
//                 currency: 'string',
//                 cost: 0,
//                 externalNumber: 'string',
//                 supplierId: 'string',
//                 status: 'inProgress',
//                 projectId: 'string',
//             },
//         ],
//     },
// };
//
// export default Invoice;
