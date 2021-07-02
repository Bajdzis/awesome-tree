import { PathInfo } from '../PathInfo/PathInfo';
import { FileContent } from './FileContent';

const content = `
class Awesome {

    doAwesomeStuff() {
        // TODO: implement
        // TODO: this
        // TODO: function
    }

    doOtherAwesomeStuff() {
        // TODO: implement!
        return true;
    }

}
`;

const contentCRLF = content.replace(/\r/g, '').replace(/\n/g, '\r\n');
const contentLF = contentCRLF.replace(/\r\n/g, '\n');

const invalidContent = `
<div>
    <div>
        <div>
`;


describe('FileContent', () => {

    it('should get info about file and path' , () => {
        const path = new PathInfo('/home/awesomeClass.ts');
        const fileContent = new FileContent(path, content);

        expect(fileContent.getExtension()).toEqual('ts');
        expect(fileContent.getContent()).toEqual(content);
    });

    it('should generated correct nodes base on space number' , () => {
        const path = new PathInfo('/home/awesomeClass.ts');
        const fileContent = new FileContent(path, content);

        const result = fileContent.getFileGraph();

        expect(result.getContent()).toEqual(content);
        expect(result).toMatchSnapshot();
    });

    it('should generated correct nodes invalid content' , () => {
        const path = new PathInfo('/home/awesomeClass.ts');
        const fileContent = new FileContent(path, invalidContent);

        const result = fileContent.getFileGraph();

        expect(result.getContent()).toEqual(invalidContent);
        expect(result).toMatchSnapshot();
    });

    it('should same working with others line break style' , () => {
        const path = new PathInfo('/home/awesomeClass.ts');
        const fileContentCRLF = new FileContent(path, contentCRLF);
        const fileContentLF = new FileContent(path, contentLF);

        const resultCRLF = fileContentCRLF.getFileGraph();
        const resultLF = fileContentLF.getFileGraph();

        expect(resultCRLF).toEqual(resultLF);
        expect(contentCRLF).not.toEqual(contentLF);

        expect(fileContentCRLF.getLineBreakStyle()).toEqual('CRLF');
        expect(fileContentLF.getLineBreakStyle()).toEqual('LF');

        expect(fileContentCRLF.getContent()).toEqual(contentCRLF);
        expect(fileContentLF.getContent()).toEqual(contentLF);

        expect(resultCRLF.getContent()).toEqual(contentLF); // delete info about line style in nodes
        expect(resultLF.getContent()).toEqual(contentLF);
    });

    it('should get lines for LF and CRLF' , () => {
        const path = new PathInfo('/home/awesomeClass.ts');
        const fileContentCRLF = new FileContent(path, contentCRLF);
        const fileContentLF = new FileContent(path, contentLF);

        const linesCRLF = fileContentCRLF.getLines();
        const linesLF = fileContentLF.getLines();

        expect(linesLF).toHaveLength(16);
        expect(linesCRLF).toHaveLength(16);
        expect(linesCRLF).toEqual(linesLF);
    });

});



