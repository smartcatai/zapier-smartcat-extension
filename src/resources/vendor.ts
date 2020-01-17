import {getVendors, getVendor, searchVendors} from "../contracts/SmartcatVendor";
import {SmartcatProjectStatus} from "../contracts/SmartcatProject";
import {SmartcatDocumentValidationStatus} from "../contracts/SmartcatDocument";

const Vendor = {
    key: "vendor",
    noun: "Vendor",

    get: {
        display: {
            label: "Get Vendor",
            description: "Gets an existing vendor.",
        },
        operation: {
            inputFields: [{key: 'id', dynamic:'vendor.id.name', required:true, label: 'Id'}],
            perform: getVendor
        }
    },

    list: {
        display: {
            label: "New Vendor",
            description: "Triggers when the new vendor is added to Smartcat account.",
        },
        operation: {
            perform: getVendors
        }
    },

    search: {
        display: {
            label: "Find Vendors",
            description: "Finds vendors filtered by name.",
        },
        operation: {
            inputFields: [
                {key: "name", type: "string", label: "Vendor Name"},
            ],
            perform: searchVendors
        }
    },
};

export default Vendor;