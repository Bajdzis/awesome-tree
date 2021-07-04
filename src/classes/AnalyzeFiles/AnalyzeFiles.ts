import { FileContent } from '../FileContent/FileContent';
import { FileContentNodeAnalyze } from '../FileContentNodeAnalyze/FileContentNodeAnalyze';
import { PathInfo } from '../PathInfo/PathInfo';

interface AnalyzeLine {
    content: string;
    paths: PathInfo[]
}
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
        return this.analyzeNodes(this.files);
    }

    getLines(nodes: FileContentNodeAnalyze[]): AnalyzeLine[] {
        const result: AnalyzeLine[] = [];

        nodes.forEach(node => {
            const start = node.getStart();
            const end = node.getEnd();
            if(start !== '') {
                result.push({
                    content: start,
                    paths: node.getPaths()
                });
            }
            result.push(
                ...this.getLines(node.getChildren()),
            );
            if(end !== '') {
                result.push({
                    content: end,
                    paths: node.getPaths()
                });
            }

        });

        return result;
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
            const [node, ...otherNodes] = nodes;

            const result = this.analyzeChildrenNodes(nodes.map(node => node.getChildren()));
            const newNode = node.setChildren(result);
            otherNodes.map(otherFile => {
                newNode.addPath(otherFile.getBasePath());
            });
            return newNode;
        });
    }
}
