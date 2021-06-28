import { PathInfo } from '../PathInfo/PathInfo';

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

}
