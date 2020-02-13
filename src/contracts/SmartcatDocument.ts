import { Bundle, ZObject } from 'zapier-platform-core';
import { Servers } from '../tools/servers';
import { Routes } from '../tools/routes';
import downloadFile from '../tools/hydrator';
import { getProjectById, getProjectList } from './SmartcatProject';
import * as FormData from 'form-data';

export interface SmartcatDocument {
    id: string;
    name: string;
    creationDate: Date;
    deadline: Date;
    sourceLanguage: string;
    documentDisassemblingStatus: string;
    targetLanguage: string;
    status: string;
    wordsCount: number;
    statusModificationDate: Date;
    pretranslateCompleted: boolean;
    workflowStages: SmartcatDocumentWorkflow[];
}

export const SmartcatDocumentStatus = {
    created: 'created',
    inProgress: 'inProgress',
    completed: 'completed',
    updated: 'updated',
    targetUpdated: 'targetUpdated',
};

export interface SmartcatDocumentWorkflow {
    progress: number;
    wordsTranslated: number;
    unassignedWordsCount: number;
    status: SmartcatAssignStatus;
}

export enum SmartcatAssignStatus {
    notAssigned,
    assigned,
    inProgress,
    completed,
}

export const SmartcatDocumentValidationStatus = {
    inProgress: 'inProgress',
    success: 'success',
    error: 'error',
};

export const SmartcatDocumentExportType = {
    target: 'target',
    xliff: 'xliff',
    multilingualCSV: 'multilangCsv',
};

interface ExportModel {
    documents: { id: string }[];
    id: string;
    exportType: string;
}

export function checkValidationStatus(documents: SmartcatDocument[], status: string): boolean {
    if (status == SmartcatDocumentValidationStatus.inProgress) {
        const any = documents.find(
            value => value.documentDisassemblingStatus == SmartcatDocumentValidationStatus.inProgress,
        );
        return !!any;
    }
    if (status == SmartcatDocumentValidationStatus.success) {
        const all = documents.filter(
            value => value.documentDisassemblingStatus == SmartcatDocumentValidationStatus.success,
        );
        return all.length == documents.length;
    }
    if (status == SmartcatDocumentValidationStatus.error) {
        const any = documents.find(
            value => value.documentDisassemblingStatus == SmartcatDocumentValidationStatus.error,
        );
        return !!any;
    }
    throw Error(`Unrecognized status ${status}`);
}

export async function uploadFile(
    z: ZObject,
    bundle: Bundle<{ project: string; file: string; name: string }>,
): Promise<any> {
    const form = await GetFile(z, bundle.inputData.file, bundle.inputData.name);

    const url = `https://${Servers[bundle.authData.server]}${Routes.UploadProjectDocument}?projectId=${
        bundle.inputData.project
    }`;
    const headers = { 'Content-Type': `multipart/form-data; boundary="${form.getBoundary()}"` };
    const response = await z.request({ method: 'POST', url: url, headers: headers, body: form });

    if (response.status != 200) throw Error(response.content);
    const documents = z.JSON.parse(response.content) as SmartcatDocument[];
    return { documents: documents };
}

export async function updateFile(
    z: ZObject,
    bundle: Bundle<{ document: string; name: string; file: string }>,
): Promise<any> {
    const form = await GetFile(z, bundle.inputData.file, bundle.inputData.name);

    const url = `https://${Servers[bundle.authData.server]}${Routes.UpdateDocument}?documentId=${
        bundle.inputData.document
    }`;
    const headers = { 'Content-Type': `multipart/form-data; boundary="${form.getBoundary()}"` };
    const response = await z.request({ method: 'PUT', url: url, headers: headers, body: form });

    if (response.status != 200) throw Error(response.content);
    const documents = z.JSON.parse(response.content) as SmartcatDocument[];
    return { documents: documents };
}

export async function exportDocument(
    z: ZObject,
    bundle: Bundle<ExportModel>,
): Promise<{ file: string; exportId: string }> {
    let queryParams = '?';
    if (bundle.inputData.id) queryParams += `documentIds[]=${bundle.inputData.id}`;
    if (bundle.inputData.exportType) queryParams += `&type=${bundle.inputData.exportType}`;
    const url = `https://${Servers[bundle.authData.server]}${Routes.CreateDocumentExport}${queryParams}`;
    const response = await z.request({ url: url, method: 'POST', headers: { Accept: 'application/json' } });
    if (response.status != 200) throw Error(response.content);
    const task = z.JSON.parse(response.content);
    const expandedZ = z as any;
    const link = expandedZ.dehydrateFile(downloadFile, { exportId: task.id });
    return { file: link, exportId: task.id };
}

export async function getDocuments(
    z: ZObject,
    bundle: Bundle<{ status: string | null; client: string | null; project: string | null }>,
): Promise<SmartcatDocument[]> {
    let projects = [];
    if (bundle.inputData.project) {
        const project = await getProjectById(z, bundle.authData.server, bundle.inputData.project);
        projects.push(project);
    } else {
        projects = await getProjectList(z, bundle.authData.server, bundle.inputData.client);
    }

    let documents = projects
        .map(value => value.documents)
        .reduce((previousValue, currentValue) => previousValue.concat(currentValue));
    if (bundle.inputData.status) documents = documents.filter(value => value.status == bundle.inputData.status);
    return documents;
}

export async function searchDocuments(
    z: ZObject,
    bundle: Bundle<{ name: string | null; client: string | null }>,
): Promise<SmartcatDocument[]> {
    const projects = await getProjectList(z, bundle.authData.server, bundle.inputData.client);
    let documents = projects
        .map(value => value.documents)
        .reduce((previousValue, currentValue) => previousValue.concat(currentValue));
    if (bundle.inputData.name)
        documents = documents.filter(value => value.name.includes(bundle.inputData.name as string));
    return documents;
}

async function GetFile(z: ZObject, file: string, name: string) {
    const response = await z.request(file);
    const form = new FormData();
    form.append('body', response.content, { contentType: 'application/octet-stream', filename: name });
    return form;
}
