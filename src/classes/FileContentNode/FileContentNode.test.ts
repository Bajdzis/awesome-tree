import { FileContentNode } from './FileContentNode';

const exampleFileContent =
`export class AwesomeClass {
   doSomething () {
      // TODO
   }
}`;

describe('FileContentNode', () => {

    it('should create correct content', () => {
        const classNode = new FileContentNode('export class AwesomeClass {', '\n}');
        const methodNode = new FileContentNode('\n   doSomething () {', '\n   }');
        const commentNode = new FileContentNode('\n      // TODO');

        classNode.addChildren(methodNode);
        methodNode.addChildren(commentNode);

        expect(classNode.getContent()).toEqual(exampleFileContent);
    });

    it('should check same node', () => {
        const methodNode = new FileContentNode('doSomething () {', '}');
        const commentNode = new FileContentNode('// TODO');
        methodNode.addChildren(commentNode);
        const methodNodeWithoutChildren = new FileContentNode('doSomething () {', '}');

        expect(methodNodeWithoutChildren.isSame(methodNode)).toEqual(true);
    });

});
