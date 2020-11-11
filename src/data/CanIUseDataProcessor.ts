import * as fs from 'fs';
import * as lite from 'caniuse-lite';
import {merge} from 'lodash';
import {DataProcessorContract} from 'data/DataProcessorContract';
import {Writer} from 'tool/Writer';
import {Browser} from 'main/Browser';
import {LoggerContract} from 'logger/LoggerContract';

export class CanIUseDataProcessor implements DataProcessorContract {
    private logger: LoggerContract;

    public constructor(logger: LoggerContract) {
        this.logger = logger;
    }

    public async process(): Promise<void> {
        await this.processUsage();
        await this.processRelease();
    }

    private processUsage(): Promise<void> { // TODO IMPROVE WITH STAT COUNTER DATA
        return new Promise<void>((resolve, reject) => {
            const usage: any = {};

            usage[Browser.ANDROID_CHROME] = this.convertBrowserUsage('and_chr', lite.agents);
            usage[Browser.ANDROID_FIREFOX] = this.convertBrowserUsage('and_ff', lite.agents);
            usage[Browser.ANDROID_OPERA] = this.convertBrowserUsage('op_mini', lite.agents);
            usage[Browser.ANDROID_SAMSUNG] = this.convertBrowserUsage('samsung', lite.agents);
            usage[Browser.ANDROID_WEBVIEW] = {};
            usage[Browser.CHROME] = this.convertBrowserUsage('chrome', lite.agents);
            usage[Browser.EDGE] = this.convertBrowserUsage('edge', lite.agents);
            usage[Browser.FIREFOX] = this.convertBrowserUsage('firefox', lite.agents);
            usage[Browser.IE] = this.convertBrowserUsage('ie', lite.agents);
            usage[Browser.IOS_SAFARI] = this.convertBrowserUsage('ios_saf', lite.agents);
            usage[Browser.NODE_JS] = {};
            usage[Browser.OPERA] = this.convertBrowserUsage('opera', lite.agents);
            usage[Browser.SAFARI] = this.convertBrowserUsage('safari', lite.agents);

            Writer.json('data/browser/usage.json', usage).then(resolve).catch(reject);
        });
    }

    private convertBrowserUsage(id: string, data: any): any { // TODO IMPROVE WITH MDN DATA
        const usage: any = {};
        Object.keys(data[id].usage_global).forEach((version) => {
            const properVersion: string = (version.includes('-') ? version.split('-')[0] : version);
            if (!isNaN(Number(properVersion))) {
                usage[Number(properVersion)] = data[id].usage_global[version];
            } else {
                this.logger.warning(String(id) + ': wrong version format ' + String(version));
            }
        });

        return usage;
    }

    private processRelease(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const release: any = {};
            release[Browser.ANDROID_CHROME] = this.convertBrowserRelease('and_chr', lite.agents);
            release[Browser.ANDROID_FIREFOX] = this.convertBrowserRelease('and_ff', lite.agents);
            release[Browser.ANDROID_OPERA] = this.convertBrowserRelease('op_mini', lite.agents);
            release[Browser.ANDROID_SAMSUNG] = this.convertBrowserRelease('samsung', lite.agents);
            release[Browser.ANDROID_WEBVIEW] = {};
            release[Browser.CHROME] = this.convertBrowserRelease('chrome', lite.agents);
            release[Browser.EDGE] = this.convertBrowserRelease('edge', lite.agents);
            release[Browser.FIREFOX] = this.convertBrowserRelease('firefox', lite.agents);
            release[Browser.IE] = this.convertBrowserRelease('ie', lite.agents);
            release[Browser.IOS_SAFARI] = this.convertBrowserRelease('ios_saf', lite.agents);
            release[Browser.NODE_JS] = {};
            release[Browser.OPERA] = this.convertBrowserRelease('opera', lite.agents);
            release[Browser.SAFARI] = this.convertBrowserRelease('safari', lite.agents);

            const baseRelease: any = JSON.parse(fs.readFileSync('data/browser/base_release.json', 'utf-8'));

            Writer.json('data/browser/release.json', merge(baseRelease, release)).then(resolve).catch(reject);
        });
    }

    private convertBrowserRelease(id: string, data: any): any {
        const usage: any = {};
        Object.keys(data[id].usage_global).forEach((version) => {
            const timestamp: number = data[id].release_date[version];
            if (timestamp !== null) {
                const properVersion: string = (version.includes('-') ? version.split('-')[0] : version);
                if (!isNaN(Number(properVersion))) {
                    usage[Number(properVersion)] = (new Date(timestamp * 1000)).toISOString();
                } else {
                    this.logger.warning(String(id) + ': wrong version format ' + String(version));
                }
            }
        });

        return usage;
    }
}
