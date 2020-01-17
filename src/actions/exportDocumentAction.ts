import {exportDocument, SmartcatDocumentExportType} from "../contracts/SmartcatDocument";

const ExportDocumentAction = {
    key: 'export_document',

    noun: 'Export',
    display: {
        label: 'Export Documents',
        description: 'Export translated documents. If multiple documents selected then the export results will be packed to .zip file.'
    },

    // `operation` is where the business logic goes.
    operation: {
        inputFields: [
            {key: 'documents', required: true, children:[{key: 'id', type: 'string', label: 'Id of the document which should be exported.'}]},
            {key: 'exportType', choices: SmartcatDocumentExportType, label: 'Type of result file'}
        ],
        perform: exportDocument
    }
};

export default ExportDocumentAction;