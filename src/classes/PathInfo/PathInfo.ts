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
            .filter(part => part.match(/([a-z]+([-|_]{1,1}[a-z]*)*)+/i))
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

    getParent() {
        if (this.isFile()) {
            const directory = this.path.replace(/[^/\\]+$/, '');
            return new PathInfo(directory);
        }
        const parentDirectory = this.path.replace(/[^/\\]+(\/|\\)$/, '');
        return new PathInfo(parentDirectory);
    }

    getName(){
        const result = this.path.match( this.isFile() ?  /([^/\\]+)$/ : /([^/\\]+)[/\\]{1,1}$/);
        if(result) {
            return result[1];
        }

        return '';
    }

    getPath() {
        return this.path;
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

    isSimilar(instanceToCompare: PathInfo){
        return this.isSimilarWords(instanceToCompare) && this.getExtension() === instanceToCompare.getExtension();
    }

    getOnlySimilarPath(paths: PathInfo[]){
        return paths.filter(path => this.isSimilar(path));
    }

    includes(partPath: PathInfo) {
        if(partPath.isFile() || partPath.getParts().length > this.getParts().length){
            return false;
        }
        return partPath.getParts().every((part,index) => part.isSame(this.getParts()[index]));
    }

    includesSimilarly(partPath: PathInfo) {
        if(partPath.isFile() || partPath.getParts().length > this.getParts().length){
            return false;
        }
        return partPath.getParts().every((part,index) => part.isSimilarly(this.getParts()[index]));
    }
}
