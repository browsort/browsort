import * as bcd from 'mdn-browser-compat-data';
import {cloneDeep, isArray, merge} from 'lodash';
import {DataProcessorContract} from 'data/DataProcessorContract';
import {LoggerContract} from 'logger/LoggerContract';
import {Writer} from 'tool/Writer';
import {Browser} from 'main/Browser';
import {default as Features} from 'parser/Features';
import {objectDiff} from 'tool/helpers';

export class MdnDataProcessor implements DataProcessorContract {
    private logger: LoggerContract;

    public constructor(logger: LoggerContract) {
        this.logger = logger;
    }

    public async process(): Promise<void> {
        await this.processJS();
    }

    private async processJS(): Promise<void> {
        // TODO merge with bcd.api !!! for builtin javascript API
        await Writer.json('data/feature/js.json', this.traverseJS(cloneDeep(bcd.javascript)));
        await Writer.json('tmp/js_feature.json', this.traverseJS(cloneDeep(bcd.javascript)), false);
        const summary: any = this.jsSummary(cloneDeep(bcd.javascript));
        await Writer.json('tmp/js_feature_summary.json', summary, false);
        await Writer.json('tmp/js_feature_not_supported.json', objectDiff(summary, Features), false);
    }

    private traverseJS(compatibility: any): any {
        Object.keys(compatibility).forEach((key) => {
            if (key === '__compat') {
                compatibility[key] = this.rewriteCompatObject(compatibility[key]);
            } else {
                compatibility[key] = this.traverseJS(compatibility[key]);
            }
        });

        return compatibility;
    }

    private rewriteCompatObject(compatibility: any): any {
        compatibility.url = compatibility.mdn_url;
        delete compatibility.mdn_url;
        delete compatibility.spec_url;
        if (compatibility.status !== undefined && compatibility.status !== null) {
            if (!compatibility.status.experimental) {
                delete compatibility.status.experimental;
            }
            if (!compatibility.status.deprecated) {
                delete compatibility.status.deprecated;
            }
            delete compatibility.status.standard_track;
            compatibility = merge(compatibility, compatibility.status);
        }
        delete compatibility.status;
        compatibility.support = this.rewriteSupport(compatibility.support);

        return compatibility;
    }

    private rewriteSupport(support: any): any {
        const newSupport: {[browserName: string]: any} = {};
        Object.keys(support).forEach((browser) => {
            const standardBrowserName: string = this.convertBrowserName(browser);
            if (isArray(support[browser])) {
                if (support[browser].length > 0) {
                    support[browser] = support[browser][0];
                } else {
                    support[browser] = {};
                }
            }

            if (support[browser].version_added === true) {
                support[browser].added = 1.0;
            } else if (support[browser].version_added === false || support[browser].version_added === null) {
                delete support[browser].version_added;
            } else if (support[browser].version_added !== undefined) {
                let versionAdded: string = support[browser].version_added;
                versionAdded = versionAdded.startsWith('≤') ? versionAdded.substring(1) : versionAdded;
                versionAdded = versionAdded.includes('.') ? versionAdded.split('.').slice(0, 2).join('.') : versionAdded;
                support[browser].added = Number(versionAdded);
                if (isNaN(support[browser].added)) {
                    this.logger.warning('cannot cast ' + versionAdded + ' to number');
                }
            }
            delete support[browser].version_added;

            if (support[browser].version_removed !== undefined) {
                support[browser].removed = support[browser].version_removed;
            }
            delete support[browser].version_removed;

            if (Object.keys(support[browser]).length > 0) {
                newSupport[standardBrowserName] = support[browser];
            }
        });

        return newSupport;
    }

    private convertBrowserName(browserName: string): string {
        switch (browserName) {
            case 'chrome':
                return Browser.CHROME;
                break;
            case 'chrome_android':
                return Browser.ANDROID_CHROME;
                break;
            case 'edge':
                return Browser.EDGE;
                break;
            case 'firefox':
                return Browser.FIREFOX;
                break;
            case 'firefox_android':
                return Browser.ANDROID_FIREFOX;
                break;
            case 'ie':
                return Browser.IE;
                break;
            case 'nodejs':
                return Browser.NODE_JS;
                break;
            case 'opera':
                return Browser.OPERA;
                break;
            case 'opera_android':
                return Browser.ANDROID_OPERA;
                break;
            case 'safari':
                return Browser.SAFARI;
                break;
            case 'safari_ios':
                return Browser.IOS_SAFARI;
                break;
            case 'samsunginternet_android':
                return Browser.ANDROID_SAMSUNG;
                break;
            case 'webview_android':
                return Browser.ANDROID_WEBVIEW;
                break;
            default:
                this.logger.warning('unknown browser name', {browser: browserName});
        }

        return browserName;
    }

    private jsSummary(compatibility: any): any {
        Object.keys(compatibility).forEach((key) => {
            if (key === '__compat') {
                delete compatibility[key];
            } else {
                compatibility[key] = this.jsSummary(compatibility[key]);
            }
        });

        return compatibility;
    }
}
