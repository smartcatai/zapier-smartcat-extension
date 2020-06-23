import { uploadFile, SmartcatDocumentStatus, getDocuments, searchDocuments } from '../contracts/SmartcatDocument';

const Document = {
    key: 'document',
    noun: 'Document',

    create: {
        display: {
            label: 'Add File',
            description: 'Adds a new file to the project.',
        },
        operation: {
            inputFields: [
                { key: 'project', dynamic: 'project.id.name', required: true, label: 'Project' },
                { key: 'file', required: true, type: 'file', label: 'File' },
                { key: 'name', required: true, type: 'string', label: 'File Name' },
            ],
            perform: uploadFile,
        },
    },

    list: {
        display: {
            label: 'New or Updated Document',
            description: 'Triggers when new document is added or status of document is modified.',
        },
        operation: {
            inputFields: [
                { key: 'status', choices: SmartcatDocumentStatus, label: 'Execution Status' },
                { key: 'client', dynamic: 'client.id.name', label: 'Client' },
                { key: 'project', dynamic: 'project.id.name', label: 'Project' },
            ],
            perform: getDocuments,
        },
    },

    search: {
        display: {
            label: 'Find Documents',
            description: 'Finds documents filtered by name and/or client name.',
        },
        operation: {
            inputFields: [
                { key: 'name', label: 'Name' },
                { key: 'client', dynamic: 'client.id.name', label: 'Client' },
            ],
            perform: searchDocuments,
        },
    },
};

export default Document;
