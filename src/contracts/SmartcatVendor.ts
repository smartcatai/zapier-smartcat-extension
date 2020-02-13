import {Bundle, ZObject} from "zapier-platform-core";
import {Servers} from "../tools/servers";
import {Routes} from "../tools/routes";

export interface SmartcatVendor {
    "id": string,
    "name": string
}

export const getVendors = async (z: ZObject, bundle: Bundle) : Promise<SmartcatVendor[]> => {
    const url = `https://${Servers[bundle.authData.server]}${Routes.GetDirectoryVendors}`;
    const response = await z.request({url: url});
    if (response.status != 200) throw new Error(response.content);
    const data = z.JSON.parse(response.content);
    return data.items as SmartcatVendor[];
};

export const searchVendors = async (z: ZObject, bundle: Bundle<{name: string}>): Promise<SmartcatVendor[]> =>{
    const vendors = await getVendors(z, bundle);
    return  vendors.filter(value => value.name.includes(bundle.inputData.name));
};

export const getVendor = async (z: ZObject, bundle: Bundle<{ id: string }>):Promise<SmartcatVendor> => {
    const vendors = await getVendors(z, bundle);
    const vendor = vendors.find(value => value.id == bundle.inputData.id);
    if (vendor) return vendor;
    throw new Error(`Vendor '${bundle.inputData.id}' has not been found at Smartcat account.`);
};
