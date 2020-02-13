import { Bundle, ZObject } from 'zapier-platform-core';
import { Servers } from '../tools/servers';
import { Routes } from '../tools/routes';

export interface SmartcatClient {
    id: string;
    name: string;
}

export const getClients = async (z: ZObject, bundle: Bundle): Promise<SmartcatClient[]> => {
    const url = `https://${Servers[bundle.authData.server]}${Routes.GetDirectoryClients}`;
    const response = await z.request({ url: url });
    if (response.status != 200) throw new Error(response.content);

    const data = z.JSON.parse(response.content);
    return data.items as SmartcatClient[];
};

export const searchClients = async (z: ZObject, bundle: Bundle<{ name: string }>): Promise<SmartcatClient[]> => {
    const vendors = await getClients(z, bundle);
    return vendors.filter(value => value.name.includes(bundle.inputData.name));
};

export const getClient = async (z: ZObject, bundle: Bundle<{ id: string }>): Promise<SmartcatClient> => {
    const vendors = await getClients(z, bundle);
    const vendor = vendors.find(value => value.id == bundle.inputData.id);
    if (vendor) return vendor;
    throw new Error(`Client '${bundle.inputData.id}' has not been found at Smartcat account.`);
};
