const dateFormat = require('dateformat');
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
    z.console.log(`from:${bundle.inputData.dateCreatedFrom}`);
    z.console.log(`to:${bundle.inputData.dateCreatedTo}`);
    let invoices: SmartcatInvoice[] = [];
    const from = bundle.inputData.dateCreatedFrom;
    const to = bundle.inputData.dateCreatedTo;

    let i = 0;
    const limit = 10;
    while (true){
        let batch = await getBatchOfInvoices(z, bundle.authData.server, new Date(from), new Date(to), i, limit);
        batch.forEach(value => invoices.push(value));
        if (batch.length < limit) return invoices;
        i += limit;
    }
}

async function getBatchOfInvoices(z: ZObject, server: string, from: Date, to: Date, skip: number, limit: number): Promise<SmartcatInvoice[]> {
    const formattedFrom = dateFormat(from, 'isoUtcDateTime');
    const formattedTo = dateFormat(to, 'isoUtcDateTime');
    const url = `https://${Servers[server]}${Routes.GetInvoiceList}?dateCreatedFrom=${formattedFrom}&dateCreatedTo=${formattedTo}&skip=${skip}&limit=${limit}`;
    z.console.log(`url:${url}`);
    const response = await z.request({ url: url });
    if (response.status != 200) throw new Error(response.content);
    z.console.log(`content:${response.content}`);
    const items = z.JSON.parse(response.content);
    items.forEach((item: SmartcatInvoice) => {
        item.id = item.number;
    });
    return items;
}