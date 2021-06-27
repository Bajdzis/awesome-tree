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

    isSimilarly(instanceToCompare: WordsInfo) {
        return this.isSameNumberOfPart(instanceToCompare) && this.isSameTextCase(instanceToCompare);
    }

    getMatchedTextCases(): TextCase[] {
        return WordsInfo.CASE_METHODS.filter(functionName => {
            return this[functionName]() === true;
        }).map(functionName => WordsInfo.CASE_METHODS_TO_CASE_NAME[functionName]);
    }
}
