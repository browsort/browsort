import {IdentifierContract} from 'parser/IdentifierContract';
import {Format} from 'reader/Format';
import {ResultBrowserContract} from 'result/ResultBrowserContract';

export interface AnalyzerContract {
    analyze(identifiers: IdentifierContract[], format?: Format): Promise<ResultBrowserContract>;
}
