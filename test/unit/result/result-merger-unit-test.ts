import {expect} from 'chai';
import {ResultMerger} from 'result/ResultMerger';
import {ResultBrowserContract} from 'result/ResultBrowserContract';

describe('ResultMerger', () => {
    describe('browsers', () => {
        it('merge 0 results', () => {
            expect(ResultMerger.browsers([])).to.be.undefined;
        });

        it('merge 2 results', () => {
            const result1: ResultBrowserContract = {
                android_chrome: {added: 34},
                android_firefox: {added: 35},
                android_opera: {added: 10},
                android_samsung: {added: 11},
                android_webview: {added: 15},
                chrome: {added: 1.5},
                edge: {added: 9},
                firefox: {added: 78},
                ie: {added: 8},
                ios_safari: {added: 8},
                nodejs: {added: 8},
                opera: null,
                safari: {added: 7}
            };
            const result2: ResultBrowserContract = {
                android_chrome: {added: 54},
                android_firefox: {added: 53},
                android_opera: {added: 10},
                android_samsung: {added: 11},
                android_webview: {added: 15},
                chrome: {added: 1.0},
                edge: {added: 8},
                firefox: {added: 54},
                ie: {added: 8},
                ios_safari: {added: 54},
                nodejs: {added: 8},
                opera: {added: 5},
                safari: null
            };

            expect(ResultMerger.browsers([result1, result2])).to.deep.equal({
                android_chrome: {added: 54},
                android_firefox: {added: 53},
                android_opera: {added: 10},
                android_samsung: {added: 11},
                android_webview: {added: 15},
                chrome: {added: 1.5},
                edge: {added: 9},
                firefox: {added: 78},
                ie: {added: 8},
                ios_safari: {added: 54},
                nodejs: {added: 8},
                opera: null,
                safari: null
            });
        });

        it('merge 3 results', () => {
            const result1: ResultBrowserContract = {
                android_chrome: {added: 34},
                android_firefox: {added: 35},
                android_opera: {added: 10},
                android_samsung: {added: 11},
                android_webview: {added: 15},
                chrome: {added: 1.5},
                edge: {added: 9},
                firefox: {added: 78},
                ie: {added: 8},
                ios_safari: {added: 8},
                nodejs: {added: 8},
                opera: {added: 54},
                safari: {added: 7}
            };
            const result2: ResultBrowserContract = {
                android_chrome: {added: 54},
                android_firefox: {added: 53},
                android_opera: {added: 10},
                android_samsung: {added: 11},
                android_webview: {added: 15},
                chrome: {added: 1.0},
                edge: {added: 8},
                firefox: {added: 54},
                ie: {added: 8},
                ios_safari: {added: 54},
                nodejs: {added: 8},
                opera: {added: 5},
                safari: {added: 38}
            };
            const result3: ResultBrowserContract = {
                android_chrome: {added: 60},
                android_firefox: {added: 55},
                android_opera: {added: 10},
                android_samsung: {added: 11},
                android_webview: {added: 15},
                chrome: {added: 2.0},
                edge: {added: 8},
                firefox: {added: 54},
                ie: {added: 8},
                ios_safari: {added: 54},
                nodejs: {added: 10},
                opera: {added: 5},
                safari: {added: 20}
            };

            expect(ResultMerger.browsers([result1, result2, result3])).to.deep.equal({
                android_chrome: {added: 60},
                android_firefox: {added: 55},
                android_opera: {added: 10},
                android_samsung: {added: 11},
                android_webview: {added: 15},
                chrome: {added: 2.0},
                edge: {added: 9},
                firefox: {added: 78},
                ie: {added: 8},
                ios_safari: {added: 54},
                nodejs: {added: 10},
                opera: {added: 54},
                safari: {added: 38}
            });
        });

        it('merge 2 results with removed info', () => {
            const result1: ResultBrowserContract = {
                android_chrome: {added: 34, removed: 50},
                android_firefox: {added: 35, removed: 60},
                android_opera: {added: 10},
                android_samsung: {added: 15},
                android_webview: {added: 15},
                chrome: {added: 1.5},
                edge: {added: 9},
                firefox: undefined,
                ie: {added: 6, removed: 9},
                ios_safari: {added: 8, removed: 10},
                nodejs: {added: 2, removed: 12},
                opera: {added: 54, removed: 60},
                safari: {added: 7, removed: 20}
            };
            const result2: ResultBrowserContract = {
                android_chrome: {added: 54},
                android_firefox: {added: 53},
                android_opera: {added: 12, removed: 20},
                android_samsung: {added: 11, removed: 30},
                android_webview: {added: 10, removed: 15},
                chrome: {added: 1.0},
                edge: {added: 8},
                firefox: {added: 54},
                ie: {added: 8, removed: 10},
                ios_safari: {added: 12},
                nodejs: {added: 8, removed: 14},
                opera: {added: 58, removed: 66},
                safari: {added: 10, removed: 15}
            };

            expect(ResultMerger.browsers([result1, result2])).to.deep.equal({
                android_chrome: null,
                android_firefox: {added: 53, removed: 60},
                android_opera: {added: 12, removed: 20},
                android_samsung: {added: 15, removed: 30},
                android_webview: null,
                chrome: {added: 1.5},
                edge: {added: 9},
                firefox: {added: 54},
                ie: {added: 8, removed: 9},
                ios_safari: null,
                nodejs: {added: 8, removed: 12},
                opera: {added: 58, removed: 60},
                safari: {added: 10, removed: 15}
            });
        });
    });
});
