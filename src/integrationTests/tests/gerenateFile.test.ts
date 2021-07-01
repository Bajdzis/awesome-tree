import { generateWorkspacePath, getExpectContent, getWorkspaceFile, workspaceFile } from '../files/files';
import { CompareFiles, FileContentCreator, FileContent } from '../../index';

describe('generateFile', () => {

    it('generate by similar path scss', () => {
        const generateFile = generateWorkspacePath('site/awesomeComponent/awesome.scss');

        const similarFiles = workspaceFile.filter(file => generateFile.isSimilar(file.getPath()));

        expect(similarFiles).toHaveLength(2);

        const comparer = new CompareFiles();

        similarFiles.forEach(file => {
            const contentCreator = new FileContentCreator(generateFile, file);
            const newFileContent = new FileContent(generateFile, contentCreator.createContent());

            comparer.addFile(newFileContent.getFileGraph());
        });

        expect(comparer.compare(1).getContent()).toEqual(getExpectContent('site/awesomeComponent/awesome.scss'));
    });

    it('generate by similar path js', () => {
        const generateFile = generateWorkspacePath('classes/awesomeClass.js');

        const similarFiles = workspaceFile.filter(file => generateFile.isSimilar(file.getPath()));

        expect(similarFiles).toHaveLength(2);

        const comparer = new CompareFiles();

        similarFiles.forEach(file => {
            const contentCreator = new FileContentCreator(generateFile, file);
            const newFileContent = new FileContent(generateFile, contentCreator.createContent());

            comparer.addFile(newFileContent.getFileGraph());
        });

        expect(comparer.compare(1).getContent()).toEqual(getExpectContent('classes/awesomeClass.js'));
    });


    it('generate by similar path html', () => {
        const generateFile = generateWorkspacePath('site/awesomeComponent/awesome.html');

        const similarFiles = workspaceFile.filter(file => generateFile.isSimilar(file.getPath()));

        expect(similarFiles).toHaveLength(2);
        expect(similarFiles).toEqual([
            getWorkspaceFile('site/footerComponent/footer.html'),
            getWorkspaceFile('site/headerComponent/header.html'),
        ]);

        const comparer = new CompareFiles();

        similarFiles.forEach(file => {
            const contentCreator = new FileContentCreator(generateFile, file);
            const newFileContent = new FileContent(generateFile, contentCreator.createContent());

            comparer.addFile(newFileContent.getFileGraph());
        });

        expect(comparer.compare(1).getContent()).toEqual(getExpectContent('site/awesomeComponent/awesome.html'));
    });

});
