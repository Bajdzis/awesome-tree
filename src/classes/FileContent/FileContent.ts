import { FileContentNode } from '../FileContentNode/FileContentNode';
import { PathInfo } from '../PathInfo/PathInfo';

interface LineInfo {
    line: string;
    whiteSpaces:  number;
}
export class FileContent {
    private path: PathInfo;
    private content: string;
    private lineBreakStyle: 'CRLF' | 'LF';

    constructor(path: PathInfo, content: string) {
        if(path.isDirectory()){
            throw new Error('[FileContent] Pass directory not file !');
        }
        this.lineBreakStyle = content.indexOf('\r\n') === -1 ? 'LF': 'CRLF';
        this.path = path;
        content = content.replace(/\r\n/g, '\n');
        if (content[content.length - 1] === '\n') {
            this.content = content;
        } else {
            this.content = `${content}\n`;
        }
    }

    getContent(){
        if (this.getLineBreakStyle() === 'CRLF') {
            return this.content.replace(/\n/g, '\r\n');
        }
        return this.content;
    }

    getPath(){
        return this.path;
    }

    getExtension(){
        return this.path.getExtension();
    }

    getLineBreakStyle() {
        return this.lineBreakStyle;
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

        const result: FileContentNode[] = [];
        let startIndex = 0;

        while (startIndex < lines.length) {
            const startLine = lines[startIndex];
            const baseWhitespace = startLine.whiteSpaces;

            let endIndex = lines.findIndex((value,index, self) => {
                const firstLineWithSameWhiteSpaces = index > startIndex + 1 && value.whiteSpaces === baseWhitespace;
                const nextLineHaveSameWhiteSpaces = index === startIndex && self[index+1]?.whiteSpaces === baseWhitespace;
                return nextLineHaveSameWhiteSpaces || firstLineWithSameWhiteSpaces;
            });
            endIndex = endIndex === -1 ? lines.length - 1 : endIndex;
            const endLine = lines[endIndex];

            if (endIndex !== startIndex) {
                const node = new FileContentNode(startLine.line, endLine.line);
                const childrenLines = lines.slice(startIndex + 1, endIndex);
                const childrenNodes = this.nodeLine(childrenLines);
                result.push(node.setChildren(childrenNodes));
            } else {
                result.push(new FileContentNode(startLine.line));
            }
            startIndex = endIndex+1;
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
