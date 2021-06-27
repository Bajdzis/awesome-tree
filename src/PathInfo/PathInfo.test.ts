import { PathInfo } from './PathInfo';


const paths = {
    someFileInDocument: {
        unix: '/home/documents/some/file.txt',
        windows: 'C:\\home\\documents\\some\\file.txt'
    },
    someDirectoryInDocument: {
        unix: '/home/documents/some/',
        windows: 'C:\\home\\documents\\some\\'
    },
    someFirst: {
        unix: '/home/documents/someFirst.ts',
        windows: 'C:\\home\\documents\\someFirst.ts'
    },
    someOtherFile: {
        unix: '/home/documents/someOtherFile.ts',
        windows: 'C:\\home\\documents\\someOtherFile.ts'
    },
    someAwesomeFile: {
        unix: '/home/documents/someAwesomeFile.ts',
        windows: 'C:\\home\\documents\\someAwesomeFile.ts'
    },
    someOtherFileSnakeCase: {
        unix: '/home/documents/some_other_file.ts',
        windows: 'C:\\home\\documents\\some_other_file.ts'
    },
    someOtherFilePascalCase: {
        unix: '/home/documents/SomeOtherFile.ts',
        windows: 'C:\\home\\documents\\SomeOtherFile.ts'
    },
} as const;


describe('PathInfo', () => {
    (['unix', 'windows'] as const).map((style) => {

        describe(`${style} style`, () => {
            it('should set file type', () => {
                const wordsInfo = new PathInfo(paths.someFileInDocument[style]);

                expect(wordsInfo.isFile()).toEqual(true);
                expect(wordsInfo.isDirectory()).toEqual(false);
            });

            it('should set file type', () => {
                const wordsInfo = new PathInfo(paths.someDirectoryInDocument[style]);

                expect(wordsInfo.isFile()).toEqual(false);
                expect(wordsInfo.isDirectory()).toEqual(true);
            });

            it('should have same number of parts', () => {
                const someFirst = new PathInfo(paths.someFirst[style]);
                const someOther = new PathInfo(paths.someOtherFile[style]);

                expect(someFirst.getParts()).toHaveLength(style === 'unix' ? 4 : 5);
                expect(someOther.getParts()).toHaveLength(style === 'unix' ? 4 : 5);
                expect(someFirst.isSameNumberOfParts(someOther)).toEqual(true);
            });
            it('should find similar paths', () => {
                const someOther = new PathInfo(paths.someOtherFile[style]);
                const someAwesome = new PathInfo(paths.someAwesomeFile[style]);

                expect(someAwesome.isSimilarWords(someOther)).toEqual(true);
            });

            it('should have correct extension', () => {
                const txtFile = new PathInfo(paths.someFileInDocument[style]);
                const typeScriptFile = new PathInfo(paths.someFirst[style]);
                const directory = new PathInfo(paths.someDirectoryInDocument[style]);

                expect(txtFile.getExtension()).toEqual('txt');
                expect(typeScriptFile.getExtension()).toEqual('ts');
                expect(directory.getExtension()).toEqual('/DIRECTORY/');
            });

            it('should find not similar paths', () => {
                const someOther = new PathInfo(paths.someOtherFile[style]);
                const someOtherPascalCase = new PathInfo(paths.someOtherFilePascalCase[style]);
                const someOtherSnakeCase = new PathInfo(paths.someOtherFileSnakeCase[style]);

                expect(someOther.isSimilarWords(someOtherPascalCase)).toEqual(false);
                expect(someOther.isSimilarWords(someOtherSnakeCase)).toEqual(false);
            });

        });

    });
});
