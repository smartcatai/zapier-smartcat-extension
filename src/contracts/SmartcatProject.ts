import {Bundle, ZObject} from "zapier-platform-core";
import {Servers} from "../tools/servers";
import {Routes} from "../tools/routes";
import {checkValidationStatus, SmartcatDocument, SmartcatDocumentValidationStatus} from "./SmartcatDocument";
const Multipart = require('multipart-stream');

export const SmartcatProjectStatus = {
    'created': "created",
    'inProgress': "inProgress",
    'completed': "completed",
    'canceled': "canceled"
};

export const SmartcatProjectStage = {
    'translation': "Translation",
    'editing': "Editing",
    'proofreading': "Proofreading",
    'postediting': "Postediting"
};

export interface SmartcatProject {
    id: string,
    name: string,
    description: string,
    deadline: Date,
    creationDate: Date,
    createdByUserId: string,
    modificationDate: Date,
    sourceLanguage: string,
    targetLanguages: string[],
    status: string,
    statusModificationDate: Date,
    domainId: number,
    clientId: string,
    vendors: { vendorAccountId: string, removedFromProject: boolean }[],
    workflowStages: { progress: number, stageType:string}[],
    documents: SmartcatDocument[],
    externalTag: string,
    specializations:string[]
}

class CreateProjectCommand {
    readonly name: string;
    readonly description: string;
    readonly sourceLanguage: string;
    readonly targetLanguages: string[];
    readonly assignToVendor: boolean;
    readonly vendorAccountIds: string[] | null;
    readonly clientId: string;
    readonly useMT: boolean;
    readonly pretranslate: boolean;
    readonly useTranslationMemory: boolean;
    readonly autoPropagateRepetitions: boolean;
    readonly workflowStages: [string];
    readonly isForTesting: boolean;
    readonly externalTag: string;

    public constructor(public data: any){
        this.name = data.name;
        this.description = data.description;
        this.sourceLanguage = data.sourceLanguage;
        this.targetLanguages = data.targetLanguages;
        this.assignToVendor = !!data.vendor;
        this.vendorAccountIds = data.vendor ? [data.vendor as string]: null;
        this.clientId = data.client ? data.client: null;
        this.useMT = false;
        this.pretranslate = false;
        this.useTranslationMemory = false;
        this.autoPropagateRepetitions = false;
        this.workflowStages = data.workflowStages;
        this.isForTesting = false;
        this.externalTag = "source:Zapier";
    }
}


export async function getProjects(z: ZObject, bundle: Bundle<{ status: string | null, validation: string | null, client: string | null }>): Promise<SmartcatProject[]> {
    let projects = await getProjectList(z, bundle.authData.server, bundle.inputData.client);
    if (bundle.inputData.status) projects = projects.filter(value => value.status == bundle.inputData.status);
    if (bundle.inputData.validation) projects = projects.filter(value => checkValidationStatus(value.documents, bundle.inputData.validation as string));
    return projects;
}

export async function searchProjects(z: ZObject, bundle: Bundle<{ name: string | null, client: string | null }>): Promise<SmartcatProject[]> {
    let projects = await getProjectList(z, bundle.authData.server, bundle.inputData.client);
    if (bundle.inputData.name) projects = projects.filter(value => value.name.includes(bundle.inputData.name as string));
    return projects;
}


export async function getProject(z: ZObject, bundle: Bundle<{id:string}>): Promise<SmartcatProject>{
    return await getProjectById(z, bundle.authData.server, bundle.inputData.id);
}

export async function createProject(z: ZObject, bundle: Bundle){
    const content = new Multipart();
    const createCommand = new CreateProjectCommand(bundle.inputData);
    const jsonHeaders = {'Content-Disposition': 'form-data; name="model"', 'Content-Type': 'application/json'};
    content.addPart({headers: jsonHeaders, body: z.JSON.stringify(createCommand)});

    const url = `https://${Servers[bundle.authData.server]}${Routes.CreateProject}`;
    const headers = {'Content-Type': `multipart/form-data; boundary="${content.boundary}"`, 'Accept': 'application/json'};
    const response = await z.request({method: "POST", url: url, headers: headers, body: content});
    if (response.status != 200) throw new Error(response.content);

    return z.JSON.parse(response.content) as SmartcatProject;
}

export async function getProjectList(z: ZObject, server:string, client:string|null): Promise<SmartcatProject[]> {
    const url = `https://${Servers[server]}${Routes.GetProjects}`;
    const response = await z.request({url: url});
    if (response.status != 200) throw new Error(response.content);
    let projects = z.JSON.parse(response.content) as SmartcatProject[];
    if (client) projects = projects.filter(value => value.clientId ==  client);
    return projects;
}

export async function getProjectById(z: ZObject, server:string, project:string): Promise<SmartcatProject> {
    const url = `https://${Servers[server]}${Routes.GetProject}/${project}`;
    const response = await z.request({url: url});
    if (response.status != 200) throw new Error(response.content);
    return  z.JSON.parse(response.content) as SmartcatProject;
}