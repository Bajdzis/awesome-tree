import { FileContentNode } from '../FileContentNode/FileContentNode';

export class CompareFiles {
    private files: FileContentNode[];
    constructor(){
        this.files = [];
    }

    addFile(file : FileContentNode) {
        this.files.push(file);
    }

    getNumberOfFile(){
        return this.files.length;
    }

    compare(percentFilter = 1) {
        const file = new FileContentNode('');
        return file.setChildren(this.compareNodes(this.files, percentFilter));
    }

    private compareNodes(nodes: FileContentNode[], percentFilter = 1): FileContentNode[] {

        const grouped: FileContentNode[][] = [];
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

    private compareChildrenNodes(nodes: FileContentNode[][], percentFilter = 1): FileContentNode[] {

        const grouped: FileContentNode[][] = [];

        nodes.forEach(children => {
            children.forEach(childrenNode => {
                const indexToAdd = grouped.findIndex(group => group[0].isSame(childrenNode));
                if(indexToAdd === -1) {
                    grouped.push([childrenNode]);
                } else {
                    grouped[indexToAdd].push(childrenNode);
                }
            });
        });

        return this.attachChildren(grouped, nodes.length, percentFilter);
    }

    private attachChildren(grouped: FileContentNode[][], numberOfAllChild:number, percentFilter= 1) {
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
