import { generateWorkspacePath, workspaceFile } from '../files/files';
import { FileContentCreator, FileContent } from '../../index';
import { AnalyzeFiles } from '../../classes/AnalyzeFiles/AnalyzeFiles';

describe('compareFile', () => {

    it('should generate info about files difference', () => {
        const generateFile = generateWorkspacePath('similar/xyzFile.txt');

        const similarFiles = workspaceFile.filter(file => generateFile.isSimilar(file.getPathInfo()));

        expect(similarFiles).toHaveLength(4);

        const comparer = new AnalyzeFiles();

        similarFiles.forEach(file => {
            const contentCreator = new FileContentCreator(generateFile, file);
            const newFileContent = new FileContent(generateFile, contentCreator.createContent());

            comparer.addFile(newFileContent);
        });

        expect(comparer.analyze()).toMatchSnapshot();
    });

});
