import { generateWorkspacePath, getWorkspaceFile, workspaceFile } from '../files/files';

describe('renameDirectory', () => {

    it('generate base on footer', () => {
        // TODO: done test

        const baseDirectory = generateWorkspacePath('site/footerComponent/');
        // const destinationPath = generateWorkspacePath('site/awesomeComponent/');

        const similarFiles = workspaceFile.filter(file => file.getPath().includes(baseDirectory));

        expect(similarFiles).toEqual([
            getWorkspaceFile('site/footerComponent/footer.html'),
            getWorkspaceFile('site/footerComponent/footer.scss'),
        ]);

        // const newContent = new FileContentCreator(baseDirectory, file);

        // expect(newContent.create()).toEqual(getExpectContent('classes/replaceNameClass.js'));
    });

});
