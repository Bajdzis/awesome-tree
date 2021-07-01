import { generateWorkspacePath, getExpectFile, getWorkspaceFile, workspaceFile } from '../files/files';
import { FileContentCreator } from '../../index';

describe('renameDirectory', () => {

    it('generate base on footer', () => {
        const baseDirectory = generateWorkspacePath('site/footerComponent/');
        const destinationPath = generateWorkspacePath('site/profileComponent/');

        const similarFiles = workspaceFile.filter(file => file.getPath().includes(baseDirectory));

        expect(similarFiles).toEqual([
            getWorkspaceFile('site/footerComponent/footer.html'),
            getWorkspaceFile('site/footerComponent/footer.scss'),
        ]);

        const files = similarFiles.map(file => {
            const newContent = new FileContentCreator(destinationPath, file);

            return newContent.createFile();
        });

        expect(files).toEqual([
            getExpectFile('site/profileComponent/profile.html'),
            getExpectFile('site/profileComponent/profile.scss'),
        ]);
    });

});
