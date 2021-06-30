import { FileContentNodeSign } from './FileContentNodeSign';

describe('FileContentNodeSign', () => {

    it('should check same sign', () => {
        const methodNode = new FileContentNodeSign('someFile.js', 'doSomething () {', '}');
        const commentNode = new FileContentNodeSign('someFile.js', '// TODO');
        methodNode.addChildren(commentNode);
        const otherNode = new FileContentNodeSign('otherFile.js', 'doSomething () {', '}');

        expect(methodNode.isSameSign(commentNode)).toEqual(true);
        expect(methodNode.isSameSign(otherNode)).toEqual(false);
    });

});
