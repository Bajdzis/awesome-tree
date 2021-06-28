import { PathInfo } from '../PathInfo/PathInfo';
import { WordsReplacer } from './WordsReplacer';

describe('WordsReplacer', () => {

    it('should replace single word in string', () => {
        const treePath = new PathInfo('/home/documents/tree.txt');
        const awesomePath = new PathInfo('/home/documents/awesome.txt');
        const replacer = new WordsReplacer(treePath, awesomePath);

        expect(replacer.replaceInString('awesomeText')).toEqual('treeText');
        expect(replacer.replaceInString('someAwesomeText')).toEqual('someTreeText');

    });

    it('should replace many word in string', () => {
        const treePath = new PathInfo('/home/documents/treeViewComponent.txt');
        const awesomePath = new PathInfo('/home/documents/awesomeComponent.txt');
        const replacer = new WordsReplacer( awesomePath, treePath);

        expect(replacer.replaceInString('tree')).toEqual('tree');
        expect(replacer.replaceInString('View')).toEqual('View');
        expect(replacer.replaceInString('TreeViewPart')).toEqual('AwesomePart');

    });

});
