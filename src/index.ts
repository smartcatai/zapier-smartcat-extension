import { Authentication, addAuthHeaders } from './authentication';
import { version as platformVersion } from 'zapier-platform-core';
import { version as connectorVersion } from '../package.json';

import Vendor from './resources/vendor';

import Country from './resources/country';
import Client from './resources/client';
import Project from './resources/project';
import Document from './resources/document';
import ExportDocumentAction from './actions/exportDocumentAction';
import downloadFile from './tools/hydrator';
import UpdateDocumentAction from './actions/updateDocumentAction';
// import Invoice from './resources/invoice';
import Job from './resources/job';
import Jobs from './resources/jobs';

const App = {
    version: connectorVersion,
    platformVersion,

    authentication: Authentication,

    beforeRequest: [addAuthHeaders],

    afterResponse: [],

    hydrators: { downloadFile },

    resources: {
        [Vendor.key]: Vendor as any,
        [Country.key]: Country as any,
        [Client.key]: Client as any,
        [Project.key]: Project as any,
        [Document.key]: Document as any,
        // [Invoice.key]: Invoice as any,
        [Job.key]: Job as any,
        [Jobs.key]: Jobs as any,
    },

    triggers: {},

    searches: {},

    creates: {
        [ExportDocumentAction.key]: ExportDocumentAction as any,
        [UpdateDocumentAction.key]: UpdateDocumentAction as any,
    },
};

export default App;
