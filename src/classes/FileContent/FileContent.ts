import { FileContentNode } from '../FileContentNode/FileContentNode';
import { PathInfo } from '../PathInfo/PathInfo';

interface LineInfo {
    line: string;
    whiteSpaces:  number;
}
export class FileContent {
    private path: PathInfo;
    private content: string;

    constructor(path: PathInfo, content: string) {
        if(path.isDirectory()){
            throw new Error('[FileContent] Pass directory not file !');
        }
        this.path = path;
        this.content = content;
    }

    getContent(){
        return this.content;
    }

    getPath(){
        return this.path;
    }

    getExtension(){
        return this.path.getExtension();
    }

    getFileGraph(): FileContentNode {
        const file = new FileContentNode();
        const lines = this.content.split('\n');

        const countWhitespace = lines.map<LineInfo>((line, index) => {

            const extendString = index === lines.length -1 ? line : `${line}\n`;

            if (line.trim().length === 0) {
                return {
                    line: extendString,
                    whiteSpaces: Math.max(
                        FileContent.countNumberOfWhitespace(lines?.[index+1] || ''),
                        FileContent.countNumberOfWhitespace(lines?.[index-1] || '')
                    )
                };
            }

            return {
                line: extendString,
                whiteSpaces: FileContent.countNumberOfWhitespace(line)
            };
        });

        const children = this.nodeLine(countWhitespace);

        return file.setChildren(children);
    }

    nodeLine(lines:LineInfo[]): FileContentNode[]{
        if (lines.length === 0 ) {
            return [];
        }
        if (lines.length === 1 ) {
            return [new FileContentNode(lines[0].line)];
        }
        const baseWhitespace = lines[0].whiteSpaces;
        let lastIndexWithBaseSpace = 0;
        let omitElementsFromEnd = 0;
        const result: FileContentNode[] = [];

        for (let i = 1; i < lines.length; i++) {
            const prevLine = lines[i-1];
            const line = lines[i];


            if(line.whiteSpaces === baseWhitespace) {
                if(prevLine.whiteSpaces === line.whiteSpaces) {
                    const node = new FileContentNode(prevLine.line);
                    result.push(node);
                    omitElementsFromEnd = 1;
                } else {
                    const start = lines[lastIndexWithBaseSpace];
                    const node = new FileContentNode(start.line, line.line);
                    const childrenNodes = this.nodeLine(lines.slice(lastIndexWithBaseSpace + 1, i));
                    result.push(node.setChildren(childrenNodes));
                    omitElementsFromEnd = 1;
                    i++;
                }
                lastIndexWithBaseSpace = i;
            } else {
                omitElementsFromEnd++;
            }
        }

        if(omitElementsFromEnd!==0) {
            const omitLines = lines.slice(lines.length - omitElementsFromEnd, lines.length);
            omitLines.forEach(line => {
                result.push(new FileContentNode(line.line));
            });
        }

        return result;
    }

    static countNumberOfWhitespace(s0: string){
        for (let i = 0; i < s0.length; i++) {
            const letter = s0[i];
            if(letter === '\t' || letter === ' ') {
                continue;
            }
            return i;
        }

        return 0;
    }

}
