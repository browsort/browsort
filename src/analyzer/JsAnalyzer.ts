import * as fs from 'fs';
import {get} from 'lodash';
import {LoggerContract} from 'logger/LoggerContract';
import {AnalyzerContract} from 'analyzer/AnalyzerContract';
import {IdentifierContract} from 'parser/IdentifierContract';
import {ResultBrowserContract} from 'result/ResultBrowserContract';
import {ResultMerger} from 'result/ResultMerger';
import {ResultBrowserFactory} from 'result/ResultBrowserFactory';

export class JsAnalyzer implements AnalyzerContract {
    private logger: LoggerContract;
    private feature: any;

    public constructor(logger: LoggerContract) {
        this.logger = logger;
        this.feature = JSON.parse(fs.readFileSync('data/feature/js.json', 'utf-8'));
    }

    public analyze(identifiers: IdentifierContract[]): Promise<ResultBrowserContract> {
        this.logger.debug('analyze javascript', {identifiers: identifiers});

        const compatibilityTables: ResultBrowserContract[] = [];
        identifiers.forEach((identifier) => {
            compatibilityTables.push(ResultBrowserFactory.fromMdn(get(this.feature, identifier.type + '.' + identifier.name)));
        });

        return Promise.resolve(ResultMerger.browsers(compatibilityTables));
    }
}
