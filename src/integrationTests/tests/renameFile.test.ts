import { generateWorkspacePath, getExpectContent, getWorkspaceFile } from '../files/files';
import { FileContentCreator } from '../../index';

describe('renameFile', () => {

    it('generate by similar path scss', () => {
        const file = getWorkspaceFile('classes/headerClass.js');
        const path = generateWorkspacePath('classes/replaceNameClass.js');

        const newContent = new FileContentCreator(path, file);

        expect(newContent.createContent()).toEqual(getExpectContent('classes/replaceNameClass.js'));
    });

});
