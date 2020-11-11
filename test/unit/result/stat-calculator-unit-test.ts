import {expect} from 'chai';
import {StatCalculatorContract} from 'result/StatCalculatorContract';
import {StatCalculator} from 'result/StatCalculator';
import {LoggerMockup} from 'mockup/LoggerMockup';
import {ResultContract} from 'result/ResultContract';
import {ResultBrowserContract} from 'result/ResultBrowserContract';
import {ResultReleaseContract} from 'result/ResultReleaseContract';

describe('StatCalculator', () => {
    const dataProvider: {name: string, compatibility: ResultBrowserContract, usage: number, release: ResultReleaseContract}[] = [
        {name: 'stat 1', compatibility: {
            android_chrome: {added: 25}, android_firefox: {added: 36}, android_opera: {added: 10.1}, android_samsung: {added: 1.5}, android_webview: {added: 37}, chrome: {added: 21},
            edge: {added: 12}, firefox: {added: 36, removed: 50}, ie: {added: 11}, ios_safari: {added: 6}, nodejs: {added: 1}, opera: {added: 9, removed: 10}, safari: {added: 5.1}
        }, usage: 85, release: {
            // TODO
            // android_chrome: {from: ''}, android_firefox: {from: ''}, android_opera: {from: ''},
            // android_samsung: {from: ''}, android_webview: {from: ''},
            chrome: {from: '2012-06-26T00:00:00.000Z'},
            edge: {from: '2015-07-29T00:00:00.000Z'}, firefox: {from: '2015-02-24T00:00:00.000Z', to: '2016-11-15T00:00:00.000Z'},
            ie: {from: '2013-10-17T00:00:00.000Z'}, ios_safari: {from: '2013-01-28T00:00:00.000Z'}, nodejs: {from: '2015-01-14T00:00:00Z'},
            opera: {from: '2006-06-20T00:00:00.000Z', to: '2009-09-01T00:00:00.000Z'}, safari: {from: '2011-07-20T00:00:00.000Z'}
        }}
    ];

    dataProvider.forEach((test) => {
        it(String(test.name), () => {
            const statCalculator: StatCalculatorContract = new StatCalculator(new LoggerMockup());
            const result: ResultContract = statCalculator.calculate(test.compatibility);

            expect(result.usage).to.be.greaterThan(test.usage);
            expect(result.release_date).to.deep.equal(test.release);
        });
    });
});
