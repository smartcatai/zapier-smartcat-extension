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
    let invoices: SmartcatInvoice[] = [];
    const from = bundle.inputData.dateCreatedFrom as Date;
    const to = bundle.inputData.dateCreatedTo as Date;

    let i = 0;
    const limit = 10;
    while (true){
        let batch = await getBatchOfInvoices(z, bundle.authData.server, from, to, i, limit);
        batch.forEach(value => invoices.push(value));
        if (batch.length < limit) return invoices;
        i += limit;
    }
}

async function getBatchOfInvoices(z: ZObject, server: string, from: Date, to: Date, skip: number, limit: number): Promise<SmartcatInvoice[]> {
    const url = `https://${Servers[server]}${Routes.GetInvoiceList}?dateCreatedFrom=${from}&dateCreatedTo=${to}&skip=${skip}&limit=${limit}`;
    const response = await z.request({ url: url });
    if (response.status != 200) throw new Error(response.content);
    const items = z.JSON.parse(response.content);
    items.forEach((item: SmartcatInvoice) => {
        item.id = item.number;
    });
    return items;
}