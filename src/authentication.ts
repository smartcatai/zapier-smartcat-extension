import { SmartcatAccount } from './contracts/SmartcatAccount';
import { Bundle, ZObject } from 'zapier-platform-core';
import { Servers } from './tools/servers';
import { Routes } from './tools/routes';

const test = async (z: ZObject, bundle: Bundle) => {
    const url = `https://${Servers[bundle.authData.server]}${Routes.GetAccount}`;
    const response = await z.request({ url: url, method: 'GET' });
    if (response.status === 401) {
        throw new Error('The Account Id and/or API Key you supplied is incorrect');
    }
    return z.JSON.parse(response.content) as SmartcatAccount;
};

export const Authentication = {
    type: 'custom',
    connectionLabel: '{{name}}',
    test: test,
    fields: [
        {
            key: 'server',
            type: 'string',
            required: true,
            choices: Servers,
            helpText: 'Server for connection',
        },
        {
            key: 'login',
            label: 'Account ID',
            type: 'string',
            required: true,
            helpText:
                'Login to your Smartcat account and navigate to Settings > API to find your Account Id and API Key',
        },
        {
            key: 'password',
            label: 'API Key',
            type: 'string',
            required: true,
        },
    ],
};

export const addAuthHeaders = (request: Request, z: ZObject, bundle: Bundle) => {
    const data = `${bundle.authData.login}:${bundle.authData.password}`;
    const buffer = Buffer.alloc(data.length, data);
    const basicHash = buffer.toString('base64');
    (request.headers as any).Authorization = `Basic ${basicHash}`;
    return request;
};
