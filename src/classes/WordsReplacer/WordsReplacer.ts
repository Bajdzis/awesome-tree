import { PathInfo } from '../PathInfo/PathInfo';
import { WordsInfo } from '../WordsInfo/WordsInfo';


export class WordsReplacer {
    private basePath: PathInfo;
    private destinationPath: PathInfo;
    private differentWords: {[key:string]: string};

    constructor(destinationPath: PathInfo, basePath : PathInfo){
        this.basePath = basePath;
        this.destinationPath = destinationPath;
        this.differentWords = this.countDifferentWords();
    }

    getDiffWords (){
        return this.differentWords;
    }

    countDifferentWords() {
        const words = this.destinationPath.getParts();
        const differentWords = this.basePath.getParts().reduce<{[key:string]: string}>((diff, part, index) => {
            const uniq = words.every(word => !word.isSame(part));
            if(uniq && words[index]) {
                const calculateDiff = part.getDiff(words[index]);
                diff = {
                    ...diff,
                    ...calculateDiff
                };
            }

            return diff;
        }, {});

        return differentWords;
    }

    replaceInString(text:string) {
        const words = new WordsInfo(text);

        return this.replaceInWords(words).getWords();
    }

    replaceInWords(words:WordsInfo){

        return words.replaceParts(this.differentWords);
    }
}
