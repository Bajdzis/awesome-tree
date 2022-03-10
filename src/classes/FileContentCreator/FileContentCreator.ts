import { FileContent } from '../FileContent/FileContent';
import { PathInfo } from '../PathInfo/PathInfo';
import { WordsInfo } from '../WordsInfo/WordsInfo';
import { WordsReplacer } from '../WordsReplacer/WordsReplacer';


export class FileContentCreator {
    private content: FileContent;
    private replacer: WordsReplacer;

    constructor(destinationPath: PathInfo, content : FileContent){
        this.content = content;
        this.replacer = new WordsReplacer(destinationPath, content.getPathInfo());
    }

    createFile() {
        return new FileContent(this.createPath(), this.createContent());
    }

    createPath() {
        const parts = this.replaceString(this.content.getPathInfo().getPath());

        return new PathInfo(parts);
    }

    createContent() {
        return this.replaceString(this.content.getContent());
    }

    private replaceString(s0:string) {
        const {parts, isWord} = WordsInfo.splitByWord(s0);

        const splitContentWithWords = parts.map((part) => {
            if(isWord(part)){
                return this.replacer.replaceInString(part);
            }

            return part;
        });

        return splitContentWithWords.join('');
    }

}
