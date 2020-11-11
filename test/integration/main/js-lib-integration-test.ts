import {expect} from 'chai';
import {BrowsortContract} from 'main/BrowsortContract';
import {Browsort} from 'main/Browsort';
import {ResultContract} from 'result/ResultContract';
import {ResultBrowserContract} from 'result/ResultBrowserContract';

describe('Browsort - javacript libraries analysis', () => {
    const dataProvider: {name: string, libPath: string, browsers: ResultBrowserContract}[] = [
        {name: 'jQuery 1', libPath: (global as any).BASE_PATH_TEST_DATA + 'javascript/lib/jquery/jquery-1.js', browsers: {
            'android_chrome': {
                'added': 49
            },
            'android_firefox': {
                'added': 4
            },
            'android_opera': {
                'added': 36
            },
            'android_samsung': {
                'added': 5
            },
            'android_webview': {
                'added': 49
            },
            'chrome': {
                'added': 49
            },
            'edge': {
                'added': 12
            },
            'firefox': {
                'added': 1
            },
            'ie': {
                'added': 6
            },
            'ios_safari': {
                'added': 7
            },
            'nodejs': {
                'added': 1
            },
            'opera': {
                'added': 12.10
            },
            'safari': {
                'added': 5.1
            }
        }},
        {name: 'jQuery 2', libPath: (global as any).BASE_PATH_TEST_DATA + 'javascript/lib/jquery/jquery-2.js', browsers: {
            'android_chrome': {
                'added': 49
            },
            'android_firefox': {
                'added': 4
            },
            'android_opera': {
                'added': 36
            },
            'android_samsung': {
                'added': 5
            },
            'android_webview': {
                'added': 49
            },
            'chrome': {
                'added': 49
            },
            'edge': {
                'added': 12
            },
            'firefox': {
                'added': 1
            },
            'ie': {
                'added': 11
            },
            'ios_safari': {
                'added': 7
            },
            'nodejs': {
                'added': 1
            },
            'opera': {
                'added': 36
            },
            'safari': {
                'added': 7
            }
        }},
        {name: 'jQuery 3', libPath: (global as any).BASE_PATH_TEST_DATA + 'javascript/lib/jquery/jquery-3.js', browsers: {
            'android_chrome': {
                'added': 49
            },
            'android_firefox': {
                'added': 4
            },
            'android_opera': {
                'added': 36
            },
            'android_samsung': {
                'added': 5
            },
            'android_webview': {
                'added': 49
            },
            'chrome': {
                'added': 49
            },
            'edge': {
                'added': 12
            },
            'firefox': {
                'added': 1
            },
            'ie': {
                'added': 11
            },
            'ios_safari': {
                'added': 7
            },
            'nodejs': {
                'added': 1
            },
            'opera': {
                'added': 36
            },
            'safari': {
                'added': 7
            }
        }}
    ];

    dataProvider.forEach((test) => {
        it(String(test.name), async () => {
            const browsort: BrowsortContract = new Browsort({logger: {displayOnConsole: false}});
            const result: ResultContract = await browsort.run({
                file: test.libPath
            });
            expect(result.browsers).to.deep.equal(test.browsers);
        });
    });
});
