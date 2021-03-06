import { FileContent } from '../FileContent/FileContent';
import { PathInfo } from '../PathInfo/PathInfo';
import { AnalyzeFiles } from './AnalyzeFiles';

const someContent = 'line1\nline2\nline3';
const invalidContent = 'line1\nline3';

const path1 = new PathInfo('/home/document/file1.txt');
const path2 = new PathInfo('/home/document/file2.txt');
const path3 = new PathInfo('/home/document/file3.txt');
const path4 = new PathInfo('/home/document/file4.txt');

const file1 = new FileContent(path1, someContent);
const file2 = new FileContent(path2, someContent);
const file3 = new FileContent(path3, invalidContent);
const file4 = new FileContent(path4, someContent);

describe('AnalyzeFiles', () => {

    it('should return analyze compare', () => {

        const analyzer = new AnalyzeFiles();
        analyzer.addFile(file1);
        analyzer.addFile(file2);
        analyzer.addFile(file3);
        analyzer.addFile(file4);

        expect(analyzer.analyze()).toMatchSnapshot();
    });

    it('should return analyze compare', () => {

        const analyzer = new AnalyzeFiles();
        analyzer.addFile(file1);
        analyzer.addFile(file2);
        analyzer.addFile(file3);
        analyzer.addFile(file4);

        const nodes = analyzer.analyze();
        const lines = analyzer.getLines(nodes);

        expect(lines.map(line => line.content).join('')).toEqual('line1\nline2\nline3\n');
        expect(lines).toEqual([
            {
                content: 'line1\n',
                paths: [path1, path2, path3, path4]
            },
            {
                content: 'line2\n',
                paths: [path1, path2, path4]
            },
            {
                content: 'line3\n',
                paths: [path1, path2, path3, path4]
            },

        ]);
    });

});
