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
});



