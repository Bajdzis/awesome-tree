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

    it('should merge words', () => {

        const awesomeWords = new WordsInfo('AwesomeTextInPascalCase');
        const someWords = new WordsInfo('some_text_in_sneak_case');

        const someBase = awesomeWords.mergeWords(someWords);
        const awesomeBase = someWords.mergeWords(awesomeWords);

        expect(someBase.getWords()).toEqual('awesome_text_in_pascal_case');
        expect(awesomeBase.getWords()).toEqual('SomeTextInSneakCase');
    });

    it('should get diff form same number of words', () => {
        const oldComponent = new WordsInfo('oldComponent');
        const newElement = new WordsInfo('newElement');

        expect(oldComponent.getDiff(newElement)).toEqual({
            'old_component' : 'new_element',
            'old': 'new',
            'component': 'element'
        });
    });

    it('should diff omit same words on end', () => {
        const oldComponent = new WordsInfo('oldComponent');
        const newComponent = new WordsInfo('newComponent');

        expect(oldComponent.getDiff(newComponent)).toEqual({
            'old' : 'new'
        });
    });

    it('should diff omit same words on start', () => {
        const oldComponent = new WordsInfo('ComponentOld');
        const newComponent = new WordsInfo('ComponentNew');

        expect(oldComponent.getDiff(newComponent)).toEqual({
            'old' : 'new'
        });
    });

    it('should diff working with other number of word', () => {
        const oldComponent = new WordsInfo('ComponentOldIsAwesome');
        const newComponent = new WordsInfo('ComponentNew');
        const awesomeView = new WordsInfo('AwesomeViewNew');

        expect(oldComponent.getDiff(newComponent)).toEqual({
            'old_is_awesome' : 'new'
        });
        expect(awesomeView.getDiff(newComponent)).toEqual({
            'awesome_view' : 'component'
        });
    });

    it('should merge words use replace parts method', () => {

        const awesomeWords = new WordsInfo('AwesomeTextInPascalCase');
        const someWords = new WordsInfo('some_text_in_sneak_case');

        const diff = awesomeWords.getDiff(someWords);
        const diff2 = someWords.getDiff(awesomeWords);

        expect(awesomeWords.replaceParts(diff)).toEqual(new WordsInfo('SomeTextInSneakCase'));
        expect(someWords.replaceParts(diff2)).toEqual(new WordsInfo('awesome_text_in_pascal_case'));
    });

});
