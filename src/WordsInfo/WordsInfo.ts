import { snakeCase, upperFirst, camelCase, lowerCase, kebabCase } from 'lodash';

export type TextCase = 'camelCase' | 'snakeCase' | 'lowerCase' | 'kebabCase' | 'pascalCase' | 'upperKebabCase' | 'upperSnakeCase' | 'other';

export class WordsInfo {
    private words: string;
    private parts: string[];
    static CASE_METHODS = ['isPascalCase', 'isLowerCase', 'isCamelCase', 'isKebabCase', 'isUpperSnakeCase', 'isUpperKebabCase'] as const;
    static CASE_METHODS_TO_CASE_NAME = {
        'isPascalCase': 'pascalCase',
        'isLowerCase': 'lowerCase',
        'isCamelCase': 'camelCase',
        'isKebabCase': 'kebabCase',
        'isUpperSnakeCase': 'upperSnakeCase',
        'isUpperKebabCase': 'upperKebabCase'
    } as const;

    constructor(words: string) {
        this.words = words;
        const inSnakeCase: string = snakeCase(words);
        this.parts = inSnakeCase.split('_');
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

    isUpperSnakeCase() {
        return (snakeCase(this.words).toUpperCase()  === this.words);
    }

    isUpperKebabCase() {
        return (kebabCase(this.words).toUpperCase()  === this.words);
    }

    isSameTextCase(instance: WordsInfo){
        return WordsInfo.CASE_METHODS.some(functionName => {
            return instance[functionName]() === true && this[functionName]() === true;
        });
    }

    getMatchedTextCases(): TextCase[] {
        return WordsInfo.CASE_METHODS.filter(functionName => {
            return this[functionName]() === true;
        }).map(functionName => WordsInfo.CASE_METHODS_TO_CASE_NAME[functionName]);
    }
}
