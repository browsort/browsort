import {AnalyzerContract} from 'analyzer/AnalyzerContract';
import {IdentifierContract} from 'parser/IdentifierContract';
import {LoggerContract} from 'logger/LoggerContract';
import {Format} from 'reader/Format';
import {JsAnalyzer} from 'analyzer/JsAnalyzer';
import {ResultBrowserContract} from 'result/ResultBrowserContract';

export class Analyzer implements AnalyzerContract {
    private logger: LoggerContract;
    private jsAnalyzer: AnalyzerContract;

    public constructor(logger: LoggerContract) {
        this.logger = logger;
        this.jsAnalyzer = new JsAnalyzer(this.logger);
    }

    public analyze(identifiers: IdentifierContract[], format: Format): Promise<ResultBrowserContract> {
        switch (format) {
            case Format.JS:
                return this.jsAnalyzer.analyze(identifiers);
                break;
            default:
                throw new Error('format ' + format + ' is not supported');
        }
    }
}
