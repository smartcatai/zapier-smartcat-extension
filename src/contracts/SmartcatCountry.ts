import { Bundle, ZObject } from 'zapier-platform-core';
import { Servers } from '../tools/servers';
import { Routes } from '../tools/routes';

export interface SmartcatCountry {
    id: string;
    name: string;
}

export const getCountries = async (z: ZObject, bundle: Bundle): Promise<SmartcatCountry[]> => {
    const url = `https://${Servers[bundle.authData.server]}${Routes.GetDirectoryCountries}`;
    const response = await z.request({ url: url });
    if (response.status != 200) throw new Error(response.content);
    const data = z.JSON.parse(response.content);
    return data.items as SmartcatCountry[];
};

export const searchCountries = async (z: ZObject, bundle: Bundle<{ name: string }>): Promise<SmartcatCountry[]> => {
    const countries = await getCountries(z, bundle);
    return countries.filter(value => value.name.includes(bundle.inputData.name));
};

export const getCountry = async (z: ZObject, bundle: Bundle<{ id: string }>): Promise<SmartcatCountry> => {
    const countries = await getCountries(z, bundle);
    const country = countries.find(value => value.id == bundle.inputData.id);
    if (country) return country;
    throw new Error(`Country '${bundle.inputData.id}' has not been found at Smartcat account.`);
};
