import {expect} from 'chai';
import {AnalyzerContract} from 'analyzer/AnalyzerContract';
import {JsAnalyzer} from 'analyzer/JsAnalyzer';
import {LoggerMockup} from 'mockup/LoggerMockup';
import {IdentifierContract} from 'parser/IdentifierContract';
import {IdentifierType} from 'parser/IdentifierType';
import {ResultBrowserContract} from 'result/ResultBrowserContract';

describe('JsAnalyzer', () => {
    const dataProvider: {name: string, identifiers: IdentifierContract[], result: ResultBrowserContract}[] = [
        {name: 'const', identifiers: [{type: IdentifierType.STATEMENT, name: 'const'}], result: {
            android_chrome: {added: 25}, android_firefox: {added: 36}, android_opera: {added: 10.1}, android_samsung: {added: 1.5}, android_webview: {added: 37}, chrome: {added: 21},
            edge: {added: 12}, firefox: {added: 36}, ie: {added: 11}, ios_safari: {added: 6}, nodejs: {added: 1}, opera: {added: 9}, safari: {added: 5.1}
        }},
        {name: '===', identifiers: [{type: IdentifierType.OPERATOR, name: 'comparison.identity'}], result: {
            android_chrome: {added: 18}, android_firefox: {added: 4}, android_opera: {added: 10.1}, android_samsung: {added: 1}, android_webview: {added: 1}, chrome: {added: 1},
            edge: {added: 12}, firefox: {added: 1}, ie: {added: 4}, ios_safari: {added: 1}, nodejs: {added: 1}, opera: {added: 4}, safari: {added: 1}
        }},
        {name: 'const / ===', identifiers: [{type: IdentifierType.STATEMENT, name: 'const'}, {type: IdentifierType.OPERATOR, name: 'comparison.identity'}], result: {
            android_chrome: {added: 25}, android_firefox: {added: 36}, android_opera: {added: 10.1}, android_samsung: {added: 1.5}, android_webview: {added: 37}, chrome: {added: 21},
            edge: {added: 12}, firefox: {added: 36}, ie: {added: 11}, ios_safari: {added: 6}, nodejs: {added: 1}, opera: {added: 9}, safari: {added: 5.1}
        }},
        // TODO add test data
    ];

    dataProvider.forEach((test) => {
        it(String(test.name), async () => {
            const jsAnalyzer: AnalyzerContract = new JsAnalyzer(new LoggerMockup());
            const result: ResultBrowserContract = await jsAnalyzer.analyze(test.identifiers);
            expect(result).to.deep.equal(test.result);
        }).retries(0);
    });
});
