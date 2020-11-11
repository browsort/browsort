import {cloneDeep, merge} from 'lodash';
import {BrowsortContract} from 'main/BrowsortContract';
import {Logger} from 'logger/Logger';
import {Reader} from 'reader/Reader';
import {Parser} from 'parser/Parser';
import {ReaderContract} from 'reader/ReaderContract';
import {ParserContract} from 'parser/ParserContract';
import {RunSettingsContract} from 'main/RunSettingsContract';
import {FileContract} from 'reader/FileContract';
import {IdentifierContract} from 'parser/IdentifierContract';
import {LoggerContract} from 'logger/LoggerContract';
import {ResultContract} from 'result/ResultContract';
import {ResultMerger} from 'result/ResultMerger';
import {Analyzer} from 'analyzer/Analyzer';
import {AnalyzerContract} from 'analyzer/AnalyzerContract';
import {StatCalculator} from 'result/StatCalculator';
import {ResultBrowserContract} from 'result/ResultBrowserContract';
import {StatCalculatorContract} from 'result/StatCalculatorContract';
import {asyncForEach} from 'tool/helpers';
import {ConfigurationContract} from './ConfigurationContract';
import DefaultRunSettings from 'main/DefaultRunSettings';
import DefaultConfiguration from './DefaultConfiguration';

export class Browsort implements BrowsortContract {
    private logger: LoggerContract;
    private reader: ReaderContract;
    private parser: ParserContract;
    private analyzer: AnalyzerContract;
    private statCalculator: StatCalculatorContract;

    public constructor(newConfiguration: ConfigurationContract = {}) {
        const configuration: ConfigurationContract = merge(cloneDeep(DefaultConfiguration), cloneDeep(newConfiguration));
        this.logger = new Logger(configuration.logger);
        this.reader = new Reader(this.logger);
        this.parser = new Parser(this.logger);
        this.analyzer = new Analyzer(this.logger);
        this.statCalculator = new StatCalculator(this.logger);
    }

    public run(runSettings: RunSettingsContract = {}): Promise<ResultContract> {
        return new Promise<ResultContract>(async (resolve, reject) => {
            try {
                const settings: RunSettingsContract = merge(cloneDeep(DefaultRunSettings), cloneDeep(runSettings));

                let files: FileContract[] = [];
                if (settings.file !== undefined) {
                    files = [await this.reader.file(settings.file)];
                } else if (settings.dir !== undefined) {
                    files = await this.reader.dir(settings.dir, settings.recursive);
                }

                const resultBrowsers: ResultBrowserContract[] = [];
                let identifiers: IdentifierContract[];
                await asyncForEach(files, async (file) => {
                    identifiers = this.parser.parse(file);
                    resultBrowsers.push(await this.analyzer.analyze(identifiers, file.format));
                });

                const result: ResultContract = this.statCalculator.calculate(ResultMerger.browsers(resultBrowsers));

                resolve(result);
            } catch (error) {
                this.logger.error(error.message, {trace: error.stackTrace});
                reject(error);
            }
        });
    }
}
