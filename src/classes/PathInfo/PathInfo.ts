import { splitStringWithSplitter } from '../../utils/splitStringWithSplitter/splitStringWithSplitter';
import { WordsInfo } from '../WordsInfo/WordsInfo';



export class PathInfo {

    private path: string;
    private parts: WordsInfo[];
    private type: 'file' | 'directory';

    constructor(path:string) {
        this.path = path;
        this.type = path.match(/[\\/]+$/i) ? 'directory': 'file';
        this.parts = splitStringWithSplitter(path,'\\/.')
            .filter(part => part.match(/[a-z]+/i))
            .map(part => new WordsInfo(part));
    }

    isFile() {
        return this.type === 'file';
    }

    isDirectory() {
        return this.type === 'directory';
    }

    getExtension(){
        if(this.isDirectory()){
            return '/DIRECTORY/';
        }
        return (/.([a-z]+)$/i).exec(this.path)?.[1];
    }

    getParts() {
        return [...this.parts];
    }

    isSameNumberOfParts(instanceToCompare: PathInfo){
        return instanceToCompare.getParts().length === this.getParts().length;
    }

    isSimilarWords(instanceToCompare: PathInfo){
        if(!this.isSameNumberOfParts(instanceToCompare)) {
            return false;
        }
        const partsToCompare = instanceToCompare.getParts();
        return this.parts.every((part, index) => part.isSimilarly(partsToCompare[index]));
    }

}
