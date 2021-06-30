import { FileContent } from '../FileContent/FileContent';
import { PathInfo } from '../PathInfo/PathInfo';
import { WordsReplacer } from '../WordsReplacer/WordsReplacer';


export class FileContentCreator {
    private content: FileContent;
    private replacer: WordsReplacer;

    constructor(destinationPath: PathInfo, content : FileContent){
        this.content = content;
        this.replacer = new WordsReplacer(destinationPath, content.getPath());
    }

    createFile() {
        return new FileContent(this.createPath(), this.createContent());
    }

    createPath() {
        const parts = this.replaceString(this.content.getPath().getPath());

        return new PathInfo(parts);
    }

    createContent() {
        return this.replaceString(this.content.getContent());
    }

    private replaceString(s0:string) {
        const allWordsInAllCase = Array.from(s0.matchAll(/([a-z]+([-|_]{1,1}[a-z]*)*)/ig)).map(result => result?.[0]).filter(str => str.length);
        const wordsSplitRegEx = new RegExp(`(${allWordsInAllCase.join('|')})`,'ig');
        const splitContent = s0.split(wordsSplitRegEx).filter(str => str.length);

        const splitContentWithWords = splitContent.map((part) => {
            if(allWordsInAllCase.includes(part)){
                return this.replacer.replaceInString(part);
            }

            return part;
        });

        return splitContentWithWords.join('');
    }

}
