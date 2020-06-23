import { updateFile } from '../contracts/SmartcatDocument';

const UpdateDocumentAction = {
    key: 'update_document',

    noun: 'Update',
    display: {
        label: 'Update Document',
        description: 'Update an existing document',
    },

    operation: {
        inputFields: [
            { key: 'document', required: true, dynamic: 'document.id.name' },
            { key: 'file', required: true, type: 'file', label: 'File' },
            { key: 'name', required: true, type: 'string', label: 'File Name' },
        ],
        perform: updateFile,
    },
};

export default UpdateDocumentAction;
