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
        },
        operation: {
            inputFields: [
                { key: 'name', label: 'Name' },
                { key: 'client', dynamic: 'client.id.name', label: 'Client' },
            ],
            perform: searchProjects,
        },
    },
};

export default Project;
