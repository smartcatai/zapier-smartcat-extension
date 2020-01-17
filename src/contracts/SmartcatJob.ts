import {Bundle, ZObject} from "zapier-platform-core";
import {Servers} from "../tools/servers";
import {Routes} from "../tools/routes";

export interface SmartcatJob {
    id: string,
    supplierId: string,
    status: string,
    invoiceNumber: string,
    supplierEmail: string,
    supplierName: string,
    supplierType: string,
    serviceType: string,
    jobDescription: string,
    unitsType: string,
    unitsAmount: number,
    pricePerUnit: number,
    currency: string,
    externalNumber: string
}


export const SmartcatJobStatus = {
    'inProgress': "inProgress",
    'invitationPending': "invitationPending",
    'waitingForAssignment': "waitingForAssignment",
    'waitingForPayment': "waitingForPayment",
    'verified': "verified",
    'paidByCustomer': "paidByCustomer",
    'paidToFreelancer': "paidToFreelancer",
    'markedAsPaid': "markedAsPaid",
    'invitationCanceled': "invitationCanceled",
    'invitationDeclined': "invitationDeclined"
};

export const SupplierType = {
    'freelancer':"freelancer",
    'company':"company"
};

export const Currency = {
    'uSD':"USD",
    'eUR':"EUR",
    'rUB':"RUB",
    'tRY':"TRY",
    'jPY':"JPY",
    'sGD':"SDG",
    'mYR':"MYR",
    'hKD':"HKD",
    'uAH':"UAH",
    'cNY':"CNY",
    'aUD':"AUD",
    'gBP':"GPB",
    'cAD':"CAD"
};

export async function createJob(z: ZObject, bundle:Bundle) : Promise<SmartcatJob> {
    const url = `https://${Servers[bundle.authData.server]}${Routes.CreateJob}`;
    const model = {
        'supplierEmail': bundle.inputData.email,
        'supplierName': bundle.inputData.name,
        'supplierType': bundle.inputData.type,
        'serviceType': bundle.inputData.service,
        'jobDescription': bundle.inputData.description,
        'unitsType': bundle.inputData.unit,
        'unitsAmount': bundle.inputData.count,
        'pricePerUnit': bundle.inputData.price,
        'currency': bundle.inputData.currency,
        'externalNumber': bundle.inputData.externalNumber
    };
    const response = await z.request({url: url, method: "POST", body: model});
    if (response.status != 200) throw Error(response.content);

    return  z.JSON.parse(response.content) as SmartcatJob;
}