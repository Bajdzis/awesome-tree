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

    create() {
        const splitContent = this.content.getContent().split(/([a-z][a-z_]*[a-z])/ig).filter(str => str.length);
        const splitContentWithWords = splitContent.map((part) => {
            if(part.match(/^([a-z][a-z_]*[a-z])$/i)){
                return this.replacer.replaceInString(part);
            }
            return part;
        });

        return splitContentWithWords.join('');
    }
}
