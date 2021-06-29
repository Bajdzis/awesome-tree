import { FileContentNode } from '../FileContentNode/FileContentNode';
import { CompareFiles } from './CompareFiles';

describe('CompareFiles', () => {

    it('should merge all node when pass 0 %', () => {
        const file = new FileContentNode('');
        const methodNode = new FileContentNode('doSomething () {', '}');
        const commentNode = new FileContentNode('// TODO');
        methodNode.addChildren(commentNode);
        const methodCalcNode = new FileContentNode('doSomething () {', '}');
        const calcNode = new FileContentNode('sum += sum + 1;');
        methodCalcNode.addChildren(calcNode);

        const comparer = new CompareFiles();
        comparer.addFile(methodNode);
        comparer.addFile(methodCalcNode);

        expect(comparer.compare(0)).toEqual(file.setChildren([methodNode.setChildren([commentNode, calcNode])]));
    });

    it('should merge only duplicate node when pass 100 %', () => {
        const file = new FileContentNode('');
        const methodNode = new FileContentNode('doSomething () {', '}');
        const commentNode = new FileContentNode('// TODO');
        methodNode.addChildren(commentNode);
        const methodCalcNode = new FileContentNode('doSomething () {', '}');
        const calcNode = new FileContentNode('sum += sum + 1;');
        methodCalcNode.addChildren(calcNode);

        const comparer = new CompareFiles();
        comparer.addFile(methodNode);
        comparer.addFile(methodCalcNode);

        expect(comparer.compare(1)).toEqual(file.setChildren([methodNode.setChildren([])]));
    });

    it('should return correct number of files', () => {
        const methodNode = new FileContentNode('doSomething () {', '}');

        const comparer = new CompareFiles();
        comparer.addFile(methodNode);

        expect(comparer.getNumberOfFile()).toEqual(1);
    });

});
