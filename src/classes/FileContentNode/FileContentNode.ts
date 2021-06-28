import { WordsInfo } from '../WordsInfo/WordsInfo';

type AllTypeNodes = FileContentNode | WordsInfo | string;

export class FileContentNode {
    private body:AllTypeNodes[];
    private end:string;
    private start:string;

    constructor(start?:string, end?:string) {
        this.start = start || '';
        this.body = [];
        this.end = end || '';
    }

    addChildren(children: AllTypeNodes){
        this.body.push(children);
    }

    setChildren(children: AllTypeNodes){
        this.body.push(children);
    }

    getContent(){
        return `${this.start}${this.body.map(node => FileContentNode.getContentNode(node)).join('')}${this.end}`;
    }

    isSame(toCompare:FileContentNode){
        return this.start === toCompare.start && this.end === toCompare.end;
    }

    private static getContentNode(node: AllTypeNodes): string {
        if(typeof node === 'string'){
            return node;
        }
        if(node instanceof  FileContentNode){
            return node.getContent();
        }
        return node.getWords();
    }
}
