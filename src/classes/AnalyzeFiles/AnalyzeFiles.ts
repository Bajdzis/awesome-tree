import { FileContent } from '../FileContent/FileContent';
import { FileContentNode } from '../FileContentNode/FileContentNode';
import { FileContentNodeAnalyze } from '../FileContentNodeAnalyze/FileContentNodeAnalyze';

export class AnalyzeFiles {
    private files: FileContentNodeAnalyze[];
    constructor(){
        this.files = [];
    }

    addFile(file : FileContent) {
        const fileNode = file.getFileGraph();
        const signNodes = FileContentNodeAnalyze.addPathToAllGraph(fileNode, file.getPathInfo());
        this.files.push(signNodes);
    }

    getNumberOfFile(){
        return this.files.length;
    }

    analyze() {
        const file = new FileContentNode();
        return file.setChildren(this.analyzeNodes(this.files));
    }

    private analyzeNodes(nodes: FileContentNodeAnalyze[]): FileContentNodeAnalyze[] {

        const grouped: FileContentNodeAnalyze[][] = [];
        nodes.forEach(node => {
            const indexToAdd = grouped.findIndex(group => group[0].isSame(node));
            if(indexToAdd === -1) {
                grouped.push([node]);
            } else {
                grouped[indexToAdd].push(node);
            }
        });

        return this.attachChildren(grouped);
    }

    private analyzeChildrenNodes(nodes: FileContentNodeAnalyze[][]): FileContentNodeAnalyze[] {

        const grouped: FileContentNodeAnalyze[][] = [];

        nodes.forEach(children => {
            children.forEach(childrenNode => {
                const indexToAdd = grouped.findIndex(group => group[0].isSame(childrenNode) && group.every(node => !node.isSameBasePath(childrenNode)));
                if(indexToAdd === -1) {
                    grouped.push([childrenNode]);
                } else {
                    grouped[indexToAdd].push(childrenNode);
                }
            });
        });

        return this.attachChildren(grouped);
    }

    private attachChildren(grouped: FileContentNodeAnalyze[][]) {
        return grouped.map(nodes => {
            const [node] = nodes;
            const result = this.analyzeChildrenNodes(nodes.map(node => node.getChildren()));
            const newNode = node.setChildren(result);

            return newNode;
        });
    }
}
