
export class FileContentNode {
    protected body:FileContentNode[];
    protected end:string;
    protected start:string;

    constructor(start?:string, end?:string) {
        this.start = start || '';
        this.body = [];
        this.end = end || '';
    }

    addChildren(children: FileContentNode){
        this.body.push(children);
    }

    getStart(){
        return this.start;
    }

    getEnd(){
        return this.end;
    }

    getChildren() {
        return [...this.body];
    }

    setChildren(children: FileContentNode[]){
        const newNode = new FileContentNode(this.start, this.end);
        newNode.body = children;
        return newNode;
    }

    getContent(): string{
        return `${this.start}${this.body.map(node => node.getContent()).join('')}${this.end}`;
    }

    isSame(toCompare:FileContentNode){
        return this.start === toCompare.start && this.end === toCompare.end;
    }

}
