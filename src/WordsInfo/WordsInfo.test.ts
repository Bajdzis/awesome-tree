import { WordsInfo } from './WordsInfo';

describe('WordsInfo', () => {
    it('should get primary info about words', () => {
        const wordsInfo = new WordsInfo('firstLetterIsSmall');

        expect(wordsInfo.getWords()).toEqual('firstLetterIsSmall');
        expect(wordsInfo.getMatchedTextCases()).toEqual(['camelCase']);
        expect(wordsInfo.getParts()).toEqual(['first', 'letter', 'is', 'small']);
    });

    it('should getWords with correct format', () => {
        const someText = new WordsInfo('Some text');

        expect(someText.getWords('pascalCase')).toEqual('SomeText');
        expect(someText.getWords('lowerCase')).toEqual('some text');
        expect(someText.getWords('camelCase')).toEqual('someText');
        expect(someText.getWords('kebabCase')).toEqual('some-text');
        expect(someText.getWords('upperKebabCase')).toEqual('SOME-TEXT');
        expect(someText.getWords('snakeCase')).toEqual('some_text');
        expect(someText.getWords('upperSnakeCase')).toEqual('SOME_TEXT');
    });

    it('should return correct text case', () => {
        expect(new WordsInfo('SomeText').getMatchedTextCases()).toEqual(['pascalCase']);
        expect(new WordsInfo('some text').getMatchedTextCases()).toEqual(['lowerCase']);
        expect(new WordsInfo('someText').getMatchedTextCases()).toEqual(['camelCase']);
        expect(new WordsInfo('some-text').getMatchedTextCases()).toEqual(['kebabCase']);
        expect(new WordsInfo('SOME-TEXT').getMatchedTextCases()).toEqual(['upperKebabCase']);
        expect(new WordsInfo('some_text').getMatchedTextCases()).toEqual(['snakeCase']);
        expect(new WordsInfo('SOME_TEXT').getMatchedTextCases()).toEqual(['upperSnakeCase']);
    });

    it('should single words matched to many text case', () => {
        expect(new WordsInfo('Word').getMatchedTextCases()).toEqual(['pascalCase']);
        expect(new WordsInfo('word').getMatchedTextCases()).toEqual(['lowerCase', 'camelCase', 'kebabCase', 'snakeCase']);
        expect(new WordsInfo('WORD').getMatchedTextCases()).toEqual(['upperSnakeCase', 'upperKebabCase']);
    });

    it('should compare instance', () => {
        const someWords = new WordsInfo('SomeWords');
        const helloWorld = new WordsInfo('HelloWorld');

        expect(someWords.isSameTextCase(helloWorld)).toEqual(true);
        expect(someWords.isSameNumberOfPart(helloWorld)).toEqual(true);
        expect(someWords.isSimilarly(helloWorld)).toEqual(true);
    });

    it('should compare instance', () => {
        const someWords = new WordsInfo('SomeWords');
        const helloWorld = new WordsInfo('hello_world');

        expect(someWords.isSameTextCase(helloWorld)).toEqual(false);
        expect(someWords.isSameNumberOfPart(helloWorld)).toEqual(true);
        expect(someWords.isSimilarly(helloWorld)).toEqual(false);
    });

    it('should compare letter disk instance', () => {
        const someWords = new WordsInfo('C:');
        const helloWorld = new WordsInfo('C:');

        expect(someWords.isSameTextCase(helloWorld)).toEqual(true);
        expect(someWords.isSameNumberOfPart(helloWorld)).toEqual(true);
        expect(someWords.isSimilarly(helloWorld)).toEqual(true);
    });

});
