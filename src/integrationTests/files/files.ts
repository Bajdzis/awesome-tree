import * as fs from 'fs';
import * as path from 'path';
import { FileContent } from '../../classes/FileContent/FileContent';
import { PathInfo } from '../../classes/PathInfo/PathInfo';

export function generateWorkspacePath(path: string) {
    return new PathInfo(`/home/document/${path}`);
}

export function getWorkspaceContent(filePath: string, ) {
    return fs.readFileSync( path.join(__dirname, 'base', filePath)).toString();
}

export function getExpectContent(filePath: string, ) {
    return fs.readFileSync( path.join(__dirname, 'expect', filePath)).toString();
}

export function getWorkspaceFile(filePath: string) {
    return new FileContent(generateWorkspacePath(filePath), getWorkspaceContent(filePath));
}

export function getExpectFile(filePath: string) {
    return new FileContent(generateWorkspacePath(filePath), getExpectContent(filePath));
}

export const workspaceFile = [
    getWorkspaceFile('classes/footerClass.js'),
    getWorkspaceFile('classes/headerClass.js'),
    getWorkspaceFile('site/footerComponent/footer.html'),
    getWorkspaceFile('site/footerComponent/footer.scss'),
    getWorkspaceFile('site/headerComponent/header.html'),
    getWorkspaceFile('site/headerComponent/header.scss'),
    getWorkspaceFile('similar/abcFile.txt'),
    getWorkspaceFile('similar/defFile.txt'),
    getWorkspaceFile('similar/ghiFile.txt'),
    getWorkspaceFile('similar/jklFile.txt'),
];
