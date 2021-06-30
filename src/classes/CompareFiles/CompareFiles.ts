import { FileContentNode } from '../FileContentNode/FileContentNode';
import { FileContentNodeSign } from '../FileContentNodeSign/FileContentNodeSign';

export class CompareFiles {
    private files: FileContentNodeSign[];
    constructor(){
        this.files = [];
    }

    addFile(file : FileContentNode) {
        const signNodes = FileContentNodeSign.signAllGraph(file, `File${ this.files.length }`);
        this.files.push(signNodes);
    }

    getNumberOfFile(){
        return this.files.length;
    }

    compare(percentFilter = 1) {
        const file = new FileContentNode();
        return file.setChildren(this.compareNodes(this.files, percentFilter).map(node => node.deleteSign()));
    }

    private compareNodes(nodes: FileContentNodeSign[], percentFilter = 1): FileContentNodeSign[] {

        const grouped: FileContentNodeSign[][] = [];
        nodes.forEach(node => {
            const indexToAdd = grouped.findIndex(group => group[0].isSame(node));
            if(indexToAdd === -1) {
                grouped.push([node]);
            } else {
                grouped[indexToAdd].push(node);
            }
        });

        return this.attachChildren(grouped, nodes.length, percentFilter);
    }

    private compareChildrenNodes(nodes: FileContentNodeSign[][], percentFilter = 1): FileContentNodeSign[] {

        const grouped: FileContentNodeSign[][] = [];

        nodes.forEach(children => {
            children.forEach(childrenNode => {
                const indexToAdd = grouped.findIndex(group => group[0].isSame(childrenNode) && group.every(node => !node.isSameSign(childrenNode)));
                if(indexToAdd === -1) {
                    grouped.push([childrenNode]);
                } else {
                    grouped[indexToAdd].push(childrenNode);
                }
            });
        });

        return this.attachChildren(grouped, nodes.length, percentFilter);
    }

    private attachChildren(grouped: FileContentNodeSign[][], numberOfAllChild:number, percentFilter= 1) {
        return grouped.filter(groupedNodes => {
            const percent = groupedNodes.length / numberOfAllChild;
            return percentFilter <= percent;
        }).map(nodes => {
            const [node] = nodes;
            const result = this.compareChildrenNodes(nodes.map(node => node.getChildren()),percentFilter);
            const newNode = node.setChildren(result);

            return newNode;
        });
    }
}
