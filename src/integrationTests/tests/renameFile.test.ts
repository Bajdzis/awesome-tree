import { generateWorkspacePath, getExpectContent, getWorkspaceFile } from '../files/files';
import { FileContentCreator } from '../../classes/FileContentCreator/FileContentCreator';

describe('renameFile', () => {

    it('generate by similar path scss', () => {
        const file = getWorkspaceFile('classes/headerClass.js');
        const path = generateWorkspacePath('classes/replaceNameClass.js');

        const newContent = new FileContentCreator(path, file);

        expect(newContent.create()).toEqual(getExpectContent('classes/replaceNameClass.js'));
    });

});
