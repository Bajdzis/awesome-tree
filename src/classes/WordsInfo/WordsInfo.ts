import { snakeCase, upperFirst, camelCase, lowerCase, kebabCase } from 'lodash';

export type TextCase = 'camelCase' | 'snakeCase' | 'lowerCase' | 'kebabCase' | 'pascalCase' | 'upperKebabCase' | 'upperSnakeCase' | 'other';

type FunctionString = (string: string) => string;
export class WordsInfo {
    private words: string;
    private parts: string[];
    static CASE_METHODS = ['isPascalCase', 'isLowerCase', 'isCamelCase', 'isKebabCase', 'isSnakeCase', 'isUpperSnakeCase', 'isUpperKebabCase'] as const;
    static CASE_METHODS_TO_CASE_NAME = {
        'isPascalCase': 'pascalCase',
        'isLowerCase': 'lowerCase',
        'isCamelCase': 'camelCase',
        'isKebabCase': 'kebabCase',
        'isSnakeCase': 'snakeCase',
        'isUpperSnakeCase': 'upperSnakeCase',
        'isUpperKebabCase': 'upperKebabCase'
    } as const;

    static textCaseToFormatter: { [key in TextCase]: FunctionString} = {
        lowerCase,
        camelCase,
        kebabCase,
        snakeCase,
        pascalCase: (value) => upperFirst(camelCase(value)),
        upperKebabCase: (value) => kebabCase(value).toUpperCase(),
        upperSnakeCase: (value) => snakeCase(value).toUpperCase(),
        other: (value) => value
    };

    constructor(words: string) {
        this.words = words;
        const inSnakeCase: string = snakeCase(words);
        this.parts = inSnakeCase.split('_');
    }

    mergeWords(base: WordsInfo){
        const diff = base.getDiff(this);

        return base.replaceParts(diff);
    }

    getDiff(toCompare: WordsInfo){
        const parts = this.getParts();
        const toCompareParts = toCompare.getParts();

        let numberSameWordsFromStart = 0;
        let numberSameWordsFromEnd = 0;

        for (let i = 0; i < parts.length; i++) {
            if(toCompareParts[i] === parts[i]){
                numberSameWordsFromStart = i+1;
            } else {
                break;
            }
        }
        for (let i = 1; i < parts.length; i++) {
            if(toCompareParts[toCompareParts.length - i] === parts[parts.length - i]){
                numberSameWordsFromEnd = i;
            } else {
                break;
            }
        }

        const from = parts.slice(numberSameWordsFromStart, parts.length - numberSameWordsFromEnd);
        const to = toCompareParts.slice(numberSameWordsFromStart, toCompareParts.length - numberSameWordsFromEnd);

        const diff: {[key:string]:string} = {};
        if(from.length !== 1 || to.length !== 1){
            diff[from.join('_')] = to.join('_');
        }
        if(from.length === to.length){
            from.forEach((value, index) => {
                diff[value] = to[index];
            });
        }
        return diff;
    }

    replaceParts(diff: {[key:string]:string}){
        const [textCase] = this.getMatchedTextCases();

        if (!textCase) {
            return new WordsInfo(this.getWords());
        }

        let asSnakeCase = this.getWords('snakeCase');
        const fromKeys = Object.keys(diff).sort((a,b) => a.length - b.length);
        const newValue = fromKeys.reduce((current, key) => {
            return current.replace(new RegExp(key,'g'), diff[key]);
        },asSnakeCase);
        const wordsInBaseTextCase = WordsInfo.textCaseToFormatter[textCase](newValue);
        return new WordsInfo(wordsInBaseTextCase);

    }

    getWords(format: TextCase = 'other') {
        return  WordsInfo.textCaseToFormatter[format](this.words);
    }

    getParts() {
        return [...this.parts];
    }

    isPascalCase() {
        return upperFirst(camelCase(this.words)) === this.words;
    }

    isLowerCase() {
        return (lowerCase(this.words)) === this.words;
    }

    isCamelCase() {
        return camelCase(this.words) === this.words;
    }

    isKebabCase() {
        return kebabCase(this.words) === this.words;
    }

    isSnakeCase() {
        return snakeCase(this.words) === this.words;
    }

    isUpperSnakeCase() {
        return (snakeCase(this.words).toUpperCase()  === this.words);
    }

    isUpperKebabCase() {
        return (kebabCase(this.words).toUpperCase()  === this.words);
    }

    isSameTextCase(instanceToCompare: WordsInfo){
        const thisTextCase = this.getMatchedTextCases();
        const compareTextCase = instanceToCompare.getMatchedTextCases();

        if (thisTextCase.length === 0 && compareTextCase.length === 0) {
            return true;
        }

        return thisTextCase.some(functionName => {
            return compareTextCase.includes(functionName);
        });
    }

    isSameNumberOfPart(instanceToCompare: WordsInfo){
        return instanceToCompare.getParts().length === this.getParts().length;
    }

    isSameParts(instanceToCompare: WordsInfo){
        const parts = this.getParts();
        const partsToCompare = instanceToCompare.getParts();
        return partsToCompare.length === parts.length && parts.every((part, index) => part === partsToCompare[index]);
    }

    isSimilarly(instanceToCompare: WordsInfo) {
        return this.isSameNumberOfPart(instanceToCompare) && this.isSameTextCase(instanceToCompare);
    }

    isSame(instanceToCompare: WordsInfo) {
        return this.isSameTextCase(instanceToCompare) && this.isSameParts(instanceToCompare);
    }

    getMatchedTextCases(): TextCase[] {
        return WordsInfo.CASE_METHODS.filter(functionName => {
            return this[functionName]() === true;
        }).map(functionName => WordsInfo.CASE_METHODS_TO_CASE_NAME[functionName]);
    }
}
