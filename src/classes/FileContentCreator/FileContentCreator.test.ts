import { PathInfo } from '../PathInfo/PathInfo';
import { FileContent } from '../FileContent/FileContent';
import { FileContentCreator } from './FileContentCreator';

describe('FileContentCreator', () => {

    it('should create correct content', () => {
        const otherClass = new PathInfo('/home/otherClass.txt');
        const awesomeClass = new PathInfo('/home/awesomeClass.ts');
        const content = `class Awesome {
            doAwesomeStuff() {
                // TODO: implement!
            }
        }`;
        const contentOther = `class Other {
            doOtherStuff() {
                // TODO: implement!
            }
        }`;

        const fileContent = new FileContent(awesomeClass, content);
        const contentCreator = new FileContentCreator(otherClass, fileContent);

        expect(contentCreator.createContent()).toEqual(`${contentOther}\n`);

    });

    it('should work with sneak case', () => {
        const otherClass = new PathInfo('/home/otherClass.txt');
        const awesomeClass = new PathInfo('/home/awesomeClass.ts');
        const content = `class Awesome {
            do_awesome_stuff() {
                // TODO: implement!
            }
        }`;
        const contentOther = `class Other {
            do_other_stuff() {
                // TODO: implement!
            }
        }`;

        const fileContent = new FileContent(awesomeClass, content);
        const contentCreator = new FileContentCreator(otherClass, fileContent);

        expect(contentCreator.createContent()).toEqual(`${contentOther}\n`);

    });

});
