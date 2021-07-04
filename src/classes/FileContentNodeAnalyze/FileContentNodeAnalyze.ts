import { FileContentNode } from '../FileContentNode/FileContentNode';
import { PathInfo } from '../PathInfo/PathInfo';

export class FileContentNodeAnalyze extends FileContentNode {
    protected body:FileContentNodeAnalyze[];
    private paths: PathInfo[];

    constructor(path: PathInfo, start?:string, end?:string) {
        super(start, end);
        this.paths = [path];
        this.body = [];
    }

    isSameBasePath(toCompare:FileContentNodeAnalyze){
        return this.paths[0] === toCompare.paths[0];
    }

    getBasePath () {
        return this.paths[0];
    }

    getPaths () {
        return [...this.paths];
    }

    addPath (path: PathInfo) {
        if(!this.paths.includes(path)) {
            this.paths.push(path);
        }
    }

    setChildren(children: FileContentNodeAnalyze[]){
        const newNode = new FileContentNodeAnalyze(this.paths[0], this.getStart(), this.getEnd());
        newNode.body = children;
        return newNode;
    }

    getChildren() {
        return [...this.body];
    }

    deleteAnalyze(): FileContentNode {
        const node = new FileContentNode(this.getStart(), this.getEnd());

        const children = this.getChildren().map(node => node.deleteAnalyze());

        return node.setChildren(children);
    }

    static addPathToAllGraph(data: FileContentNode, path: PathInfo): FileContentNodeAnalyze {
        const main = new FileContentNodeAnalyze(path, data.getStart(), data.getEnd());

        const children = data.getChildren().map(node => FileContentNodeAnalyze.addPathToAllGraph(node, path));

        return main.setChildren(children);
    }
}
