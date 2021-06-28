import { findSimilarPaths } from './findSimilarPaths';



describe('findSimilarPaths', () => {

    const windowsPaths = [
        'C:/site/components/nav/nav.js',
        'C:/site/components/nav/nav.css',
        'C:/site/components/btn/btn.js',
        'C:/site/components/btn/btn.css'
    ];

    it.skip('should not return search path', () => {

        const result = findSimilarPaths('C:/site/', 'C:/site/components/nav/nav.js', windowsPaths);
        expect(result).toEqual(['C:/site/components/btn/btn.js']);
    });
});
