import { generateWorkspacePath, workspaceFile, getExpectContent } from '../files/files';
import { FileContentCreator, FileContent, AnalyzeFiles } from '../../index';

describe('analyzeFile', () => {

    it('should generate info about files difference', () => {
        const basePath = generateWorkspacePath('similar/abcFile.txt');

        const similarFiles = workspaceFile.filter(file => basePath.isSimilar(file.getPathInfo()));

        expect(similarFiles).toHaveLength(4);

        const analyzer = new AnalyzeFiles();

        similarFiles.forEach(file => {
            const contentCreator = new FileContentCreator(basePath, file);
            const newFileContent = new FileContent(file.getPathInfo(), contentCreator.createContent());
            analyzer.addFile(newFileContent);
        });

        const nodes = analyzer.analyze();

        const lines = analyzer.getLines(nodes);

        expect(lines.map(line => {
            return `${line.paths.length} / ${similarFiles.length} (${((line.paths.length / similarFiles.length) * 100).toFixed(1)} %) -> ${line.content}`;
        }).join('')).toEqual(getExpectContent('similar/abcResult.txt'));
    });

});
