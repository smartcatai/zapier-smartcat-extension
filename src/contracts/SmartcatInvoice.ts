import { Bundle, ZObject } from 'zapier-platform-core';
import { Servers } from '../tools/servers';
import { Routes } from '../tools/routes';

export interface SmartcatInvoice {
    id: string;
    number: string;
    currency: string;
    cost: number;
    date: string;
    status: string;
}

export interface GetInvoicesDto {
    dateCreatedFrom: any;
    dateCreatedTo: any;
    limit?: number;
    skip?: number;
}

export async function getInvoices(z: ZObject, bundle: Bundle<GetInvoicesDto>): Promise<SmartcatInvoice[]> {
    const queryParams = [];
    if (bundle.inputData.dateCreatedFrom) {
        const startDate = bundle.inputData.dateCreatedFrom.split('+')[0] + 'Z';
        queryParams.push(`dateCreatedFrom=${startDate}`);
    }
    if (bundle.inputData.dateCreatedTo) {
        const endDate = bundle.inputData.dateCreatedTo.split('+')[0] + 'Z';
        queryParams.push(`dateCreatedTo=${endDate}`);
    }
    if (bundle.inputData.limit) queryParams.push(`limit=${bundle.inputData.limit}`);
    if (bundle.inputData.skip) queryParams.push(`skip=${bundle.inputData.skip}`);
    const query = queryParams.length > 0 ? '?' + queryParams.join('&') : '';
    const url = `https://${Servers[bundle.authData.server]}${Routes.GetInvoiceList}${query}`;
    const response = await z.request({ url: url });
    if (response.status != 200) throw new Error(response.content);
    const items = z.JSON.parse(response.content);
    items.forEach((item: SmartcatInvoice) => {
        item.id = item.number;
    });
    return items as SmartcatInvoice[];
}
