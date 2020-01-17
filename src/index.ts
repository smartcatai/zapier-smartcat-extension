import {Authentication, addAuthHeaders} from "./authentication";
import { version as platformVersion } from "zapier-platform-core";
const { version } = require("../package.json");

import Vendor from "./resources/vendor";


import Country from "./resources/country";
import Client from "./resources/client";
import Project from "./resources/project";
import Document from "./resources/document";
import ExportDocumentAction from "./actions/exportDocumentAction";
import downloadFile from "./tools/hydrator";
import UpdateDocumentAction from "./actions/updateDocumentAction";

const App = {
  version,
  platformVersion,

  authentication: Authentication,

  beforeRequest: [addAuthHeaders],

  afterResponse: [],

  hydrators:{downloadFile},

  resources: {
    [Vendor.key]: Vendor as any,
    [Country.key]: Country as any,
    [Client.key]: Client as any,
    [Project.key]: Project as any,
    [Document.key]: Document as any
  },

  triggers: {},

  searches: {},

  creates: {
    [ExportDocumentAction.key]: ExportDocumentAction as any,
    [UpdateDocumentAction.key]: UpdateDocumentAction as any
  }
};

export default App;
