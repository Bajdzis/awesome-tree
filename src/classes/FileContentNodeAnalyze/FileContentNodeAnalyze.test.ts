import { PathInfo } from '../PathInfo/PathInfo';
import { FileContentNodeAnalyze } from './FileContentNodeAnalyze';

const someFilePath = new PathInfo('/home/someFile.js');
const otherFilePath = new PathInfo('/home/otherFile.js');

describe('FileContentNodeAnalyze', () => {

    it('should check same base PathInfo', () => {

        const methodNode = new FileContentNodeAnalyze(someFilePath, 'doSomething () {', '}');
        const commentNode = new FileContentNodeAnalyze(someFilePath, '// TODO');
        methodNode.addChildren(commentNode);
        const otherNode = new FileContentNodeAnalyze(otherFilePath, 'doSomething () {', '}');

        expect(methodNode.isSameBasePath(commentNode)).toEqual(true);
        expect(methodNode.isSameBasePath(otherNode)).toEqual(false);
    });

    it('should can add new paths', () => {
        const commentNode = new FileContentNodeAnalyze(someFilePath, '// TODO');

        commentNode.addPath(otherFilePath);

        expect(commentNode.getBasePath()).toEqual(someFilePath);
        expect(commentNode.getPaths()).toEqual([someFilePath, otherFilePath]);
    });


    it('should can`t add same path twice', () => {
        const commentNode = new FileContentNodeAnalyze(someFilePath, '// TODO');

        commentNode.addPath(otherFilePath);
        commentNode.addPath(otherFilePath);
        commentNode.addPath(otherFilePath);
        commentNode.addPath(otherFilePath);

        expect(commentNode.getBasePath()).toEqual(someFilePath);
        expect(commentNode.getPaths()).toEqual([someFilePath, otherFilePath]);
    });


});
