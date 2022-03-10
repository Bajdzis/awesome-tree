import { splitStringWithSplitter } from '../../utils/splitStringWithSplitter/splitStringWithSplitter';
import { WordsInfo } from '../WordsInfo/WordsInfo';



export class PathInfo {

    private path: string;
    private parts: WordsInfo[];
    private subParts: (WordsInfo|string)[][];
    private type: 'file' | 'directory';

    constructor(path:string) {
        this.path = path;
        this.type = path.match(/[\\/]+$/i) ? 'directory': 'file';
        this.subParts = splitStringWithSplitter(path,'\\/.')
            .map(part => {

                const {parts,isWord} = WordsInfo.splitByWord(part);

                return parts.reduce<(WordsInfo|string)[]>((acc, part) => {
                    if(isWord(part)) {
                        acc.push(new WordsInfo(part));
                    }else {
                        acc.push(part);
                    }
                    return acc;
                }, []);
            });

        this.parts =this.subParts.reduce<(WordsInfo)[]>((acc, parts) => {
            parts.forEach(part => {
                if(part instanceof WordsInfo) {
                    acc.push(part);
                }
            });
            return acc;
        }, []);
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
        return instanceToCompare.subParts.length === this.subParts.length;
    }

    isSimilarWords(instanceToCompare: PathInfo){
        if(!this.isSameNumberOfParts(instanceToCompare)) {
            return false;
        }
        return this.parts.every((parts, index) => {
            return parts.isSimilarly(instanceToCompare.getParts()[index]);
        });
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

    // delete subParts in snapshot testing
    toJSON() {
        return {
            name: 'PathInfo',
            path: this.path,
            parts: this.parts,
            type: this.type,
        };
    }

}
