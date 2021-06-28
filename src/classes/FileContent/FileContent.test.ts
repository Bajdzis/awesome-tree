import { PathInfo } from '../PathInfo/PathInfo';
import { FileContent } from './FileContent';

describe('FileContent', () => {

    it('should get info about file and path' , () => {
        const path = new PathInfo('/home/awesomeClass.ts');
        const content = `class Awesome {
            doAwesomeStuff() {
                // TODO: implement!
            }
        }`;
        const fileContent = new FileContent(path, content);

        expect(fileContent.getExtension()).toEqual('ts');
        expect(fileContent.getContent()).toEqual(content);
    });
});



