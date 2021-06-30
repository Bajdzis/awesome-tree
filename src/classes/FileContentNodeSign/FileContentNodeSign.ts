import { FileContentNode } from '../FileContentNode/FileContentNode';

export class FileContentNodeSign extends FileContentNode {
    protected body:FileContentNodeSign[];
    private sign:string;

    constructor(sign: string, start?:string, end?:string) {
        super(start, end);
        this.sign = sign;
        this.body = [];
    }

    isSameSign(toCompare:FileContentNodeSign){
        return this.sign === toCompare.sign;
    }

    setChildren(children: FileContentNodeSign[]){
        const newNode = new FileContentNodeSign(this.sign, this.getStart(), this.getEnd());
        newNode.body = children;
        return newNode;
    }

    getChildren() {
        return [...this.body];
    }

    deleteSign(): FileContentNode {
        const node = new FileContentNode(this.getStart(), this.getEnd());

        const children = this.getChildren().map(node => node.deleteSign());

        return node.setChildren(children);
    }

    static signAllGraph(data: FileContentNode, sign: string): FileContentNodeSign {
        const main = new FileContentNodeSign(sign, data.getStart(), data.getEnd());

        const children = data.getChildren().map(node => FileContentNodeSign.signAllGraph(node, sign));

        return main.setChildren(children);
    }
}
