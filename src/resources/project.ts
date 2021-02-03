import {
    SmartcatProjectStage,
    SmartcatProjectStatus,
    getProjects,
    getProject,
    createProject,
    searchProjects,
} from '../contracts/SmartcatProject';
import { SmartcatLanguages } from '../contracts/SmartcatLanguages';
import { SmartcatDocumentValidationStatus } from '../contracts/SmartcatDocument';

const Project = {
    key: 'project',
    noun: 'Project',

    create: {
        display: {
            label: 'Create Project',
            description: 'Creates a new project.',
            important: true,
        },
        operation: {
            inputFields: [
                { key: 'name', required: true, type: 'string', label: 'Name' },
                { key: 'description', type: 'string', label: 'Description' },
                {
                    key: 'sourceLanguage',
                    choices: SmartcatLanguages,
                    required: true,
                    type: 'string',
                    label: 'Source Language',
                },
                {
                    key: 'targetLanguages',
                    choices: SmartcatLanguages,
                    required: true,
                    list: true,
                    type: 'string',
                    label: 'Target Languages',
                },
                {
                    key: 'workflowStages',
                    choices: SmartcatProjectStage,
                    required: true,
                    list: true,
                    type: 'string',
                    label: 'Workflow Stages',
                },
                { key: 'vendor', dynamic: 'vendor.id.name' },
                { key: 'client', dynamic: 'client.id.name' },
            ],
            perform: createProject,
        },
    },

    get: {
        display: {
            label: 'Get project',
            description: 'Gets an existing project.',
        },
        operation: {
            inputFields: [{ key: 'id', required: true, type: 'string', label: 'Id' }],
            perform: getProject,
        },
    },

    list: {
        display: {
            label: 'New or Updated Project',
            description: 'Triggers when new project is added or status of project is modified.',
            important: true,
        },
        operation: {
            inputFields: [
                { key: 'status', choices: SmartcatProjectStatus, label: 'Execution Status' },
                { key: 'client', dynamic: 'client.id.name', label: 'Client' },
                { key: 'validation', choices: SmartcatDocumentValidationStatus, label: 'Validation Status' },
            ],
            perform: getProjects,
        },
    },

    search: {
        display: {
            label: 'Find Projects',
            description: 'Finds projects filtered by name and/or client name.',
            important: true,
        },
        operation: {
            inputFields: [
                { key: 'name', label: 'Name' },
                { key: 'client', dynamic: 'client.id.name', label: 'Client' },
            ],
            perform: searchProjects,
        },
    },

    sample: {
        id: 'adcdef12-1234-5678-90ab-1234567890ab',
        accountId: 'adcdef12-1234-5678-90ab-1234567890ab',
        name: 'Sample project',
        description: 'Sample project',
        creationDate: '2021-01-22T12:42:31.071Z',
        modificationDate: '2021-01-22T12:42:31.071Z',
        sourceLanguageId: 9,
        sourceLanguage: 'en',
        targetLanguages: ['es'],
        status: 'completed',
        statusModificationDate: '2021-01-23T09:16:53.73Z',
        vendors: [
            {
                vendorAccountId: 'adcdef12-1234-5678-90ab-1234567890ab',
                removedFromProject: false,
            },
        ],
        workflowStages: [
            {
                progress: 100.0,
                stageType: 'translation',
            },
        ],
        documents: [
            {
                id: '1234567890abcdef12345678_10',
                name: 'Sample document',
                creationDate: '2021-01-22T12:42:32.166Z',
                deadline: '2021-01-22T16:30:00Z',
                sourceLanguage: 'en',
                documentDisassemblingStatus: 'success',
                targetLanguage: 'es',
                status: 'completed',
                wordsCount: 489,
                statusModificationDate: '2021-01-23T09:16:53.565Z',
                pretranslateCompleted: false,
                workflowStages: [
                    {
                        progress: 100.0,
                        wordsTranslated: 489,
                        unassignedWordsCount: 489,
                        status: 'completed',
                        executives: [],
                    },
                ],
                externalId: '1234567890abcdef12345678',
                placeholdersAreEnabled: false,
            },
        ],
        // externalTag: 'source:Sample',
        specializations: [],
        managers: [],
        customFields: {},
    },
};

export default Project;
