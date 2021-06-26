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
} as const;


describe('WordsInfo', () => {
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

            it('should have correct extension', () => {
                const txtFile = new PathInfo(paths.someFileInDocument[style]);
                const typeScriptFile = new PathInfo(paths.someFirst[style]);
                const directory = new PathInfo(paths.someDirectoryInDocument[style]);

                expect(txtFile.getExtension()).toEqual('txt');
                expect(typeScriptFile.getExtension()).toEqual('ts');
                expect(directory.getExtension()).toEqual('/DIRECTORY/');
            });

        });

    });
});
