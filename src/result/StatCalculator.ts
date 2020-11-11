import * as fs from 'fs';
import {StatCalculatorContract} from 'result/StatCalculatorContract';
import {ResultBrowserContract} from 'result/ResultBrowserContract';
import {ResultContract} from 'result/ResultContract';
import {LoggerContract} from 'logger/LoggerContract';
import {MdnUsageContract} from 'data/MdnUsageContract';
import {MdnReleaseContract} from 'data/MdnReleaseContract';
import {ResultReleaseContract} from 'result/ResultReleaseContract';

export class StatCalculator implements StatCalculatorContract {
    private usage: MdnUsageContract;
    private release_date: MdnReleaseContract;

    public constructor(_logger: LoggerContract) {
        this.usage = JSON.parse(fs.readFileSync('data/browser/usage.json', 'utf-8'));
        this.release_date = JSON.parse(fs.readFileSync('data/browser/release.json', 'utf-8'));
    }

    public calculate(browserCompatibility: ResultBrowserContract): ResultContract {
        const result: ResultContract = {browsers: browserCompatibility};

        result.usage = this.calculateUsage(browserCompatibility);
        result.release_date = this.calculateRelease(browserCompatibility);

        return result;
    }

    private calculateUsage(browserCompatibility: ResultBrowserContract): number {
        let usage: number = 0;
        Object.keys(browserCompatibility).forEach((browserName) => {
            if (this.usage[browserName] !== undefined) {
                Object.keys(this.usage[browserName]).forEach((version) => {
                    if (Number(version) >= browserCompatibility[browserName].added
                            && (browserCompatibility[browserName].removed === undefined || Number(version) < browserCompatibility[browserName].removed)) {
                        usage += this.usage[browserName][version];
                    }
                });
            }
        });

        return usage;
    }

    private calculateRelease(browserCompatibility: ResultBrowserContract): ResultReleaseContract {
        const releaseDate: ResultReleaseContract = {};

        Object.keys(browserCompatibility).forEach((browserName) => {
            if (this.release_date[browserName] !== undefined) {
                if (browserCompatibility[browserName].added !== undefined) {
                    const from: string = this.release_date[browserName][String(browserCompatibility[browserName].added)];
                    if (from !== undefined) {
                        releaseDate[browserName] = {
                            from: from
                        };
                    }

                    if (browserCompatibility[browserName].removed !== undefined) {
                        const to: string = this.release_date[browserName][String(browserCompatibility[browserName].removed)];
                        if (to !== undefined) {
                            releaseDate[browserName].to = to;
                        }
                    }
                }
            }
        });

        return releaseDate;
    }
}
