import * as fs from 'fs';
import * as path from 'path';
import { FileContent } from '../../classes/FileContent/FileContent';
import { PathInfo } from '../../classes/PathInfo/PathInfo';

export function generateWorkspacePath(path: string) {
    return new PathInfo(`/home/document/${path}`);
}

export function getContentWorkspaceFile(filePath: string, ) {
    return fs.readFileSync( path.join(__dirname, 'base', filePath)).toString();
}

export function getExpectContent(filePath: string, ) {
    return fs.readFileSync( path.join(__dirname, 'expect', filePath)).toString();
}

export function generateWorkspaceFile(filePath: string) {
    return new FileContent(generateWorkspacePath(filePath), getContentWorkspaceFile(filePath));
}

export const workspaceFile = [
    generateWorkspaceFile('classes/footerClass.js'),
    generateWorkspaceFile('classes/headerClass.js'),
    generateWorkspaceFile('site/footerComponent/footer.html'),
    generateWorkspaceFile('site/footerComponent/footer.scss'),
    generateWorkspaceFile('site/headerComponent/header.html'),
    generateWorkspaceFile('site/headerComponent/header.scss'),
];
