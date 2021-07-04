import { PathInfo } from '../PathInfo/PathInfo';
import { FileContentNodeAnalyze } from './FileContentNodeAnalyze';

describe('FileContentNodeAnalyze', () => {

    it('should check same base PathInfo', () => {
        const someFilePath = new PathInfo('/home/someFile.js');
        const otherFilePath = new PathInfo('/home/otherFile.js');

        const methodNode = new FileContentNodeAnalyze(someFilePath, 'doSomething () {', '}');
        const commentNode = new FileContentNodeAnalyze(someFilePath, '// TODO');
        methodNode.addChildren(commentNode);
        const otherNode = new FileContentNodeAnalyze(otherFilePath, 'doSomething () {', '}');

        expect(methodNode.isSameBasePath(commentNode)).toEqual(true);
        expect(methodNode.isSameBasePath(otherNode)).toEqual(false);
    });

});
