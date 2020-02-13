import { Bundle, ZObject } from 'zapier-platform-core';
import { Servers } from './servers';
import { Routes } from './routes';

export function downloadFile(z: ZObject, bundle: Bundle<{ exportId: string }>) {
    const url = `https://${Servers[bundle.authData.server]}/${Routes.CreateDocumentExport}/${
        bundle.inputData.exportId
    }`;
    const za = z as any;
    const filePromise = z.request({ url: url, raw: true });
    return za.stashFile(filePromise as any);
}

export default downloadFile;
