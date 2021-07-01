import { generateWorkspacePath, getExpectContent, getExpectFile, getWorkspaceFile, workspaceFile } from '../files/files';
import { CompareFiles } from '../../classes/CompareFiles/CompareFiles';
import { FileContentCreator } from '../../classes/FileContentCreator/FileContentCreator';
import { FileContent } from '../../classes/FileContent/FileContent';

describe('generateDirectory', () => {

    it('generate base on footer', () => {
        const generateDirectory = generateWorkspacePath('site/awesomeComponent/');
        const parentGenerateDirectory = generateDirectory.getParent();

        const similarFiles = workspaceFile.filter(file => file.getPath().includes(parentGenerateDirectory));

        expect(similarFiles).toEqual([
            getWorkspaceFile('site/footerComponent/footer.html'),
            getWorkspaceFile('site/footerComponent/footer.scss'),
            getWorkspaceFile('site/headerComponent/header.html'),
            getWorkspaceFile('site/headerComponent/header.scss'),
        ]);

        const groupedFiles: FileContent[][] = similarFiles.reduce<FileContent[][]>((arr,file) => {

            for (let i = 0; i < arr.length; i++) {
                const [element] = arr[i];
                if(element.getPath().isSimilar(file.getPath())){
                    arr[i].push(file);
                    return arr;
                }
            }
            arr.push([file]);
            return arr;
        }, []);

        expect(groupedFiles).toEqual([
            [
                getWorkspaceFile('site/footerComponent/footer.html'),
                getWorkspaceFile('site/headerComponent/header.html'),
            ],
            [
                getWorkspaceFile('site/footerComponent/footer.scss'),
                getWorkspaceFile('site/headerComponent/header.scss'),
            ]
        ]);

        const createFiles = groupedFiles.map((files) => {
            const newContent = new FileContentCreator(generateDirectory, files[1]);

            const generateFilePath = newContent.createPath();

            const comparer = new CompareFiles();

            files.forEach(file => {
                const contentCreator = new FileContentCreator(generateFilePath, file);
                const newFileContent = new FileContent(generateFilePath, contentCreator.createContent());

                comparer.addFile(newFileContent.getFileGraph());
            });

            return new FileContent(generateFilePath, comparer.compare(1).getContent());
        });

        expect(createFiles).toEqual([
            getExpectFile('site/awesomeComponent/awesome.html'),
            getExpectFile('site/awesomeComponent/awesome.scss')
        ]);


    });
});
