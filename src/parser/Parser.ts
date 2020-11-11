import {ParserContract} from 'parser/ParserContract';
import {FileContract} from 'reader/FileContract';
import {IdentifierContract} from 'parser/IdentifierContract';
import {JsParser} from 'parser/JsParser';
import {Format} from 'reader/Format';
import {LoggerContract} from 'logger/LoggerContract';

export class Parser implements ParserContract {
    private logger: LoggerContract;
    private jsParser: ParserContract;

    public constructor(logger: LoggerContract) {
        this.logger = logger;
        this.jsParser = new JsParser(this.logger);
    }

    public parse(file: FileContract): IdentifierContract[] {
        let results: IdentifierContract[] = [];
        switch (file.format) {
            case Format.JS:
                results = this.jsParser.parse(file);
                break;
            default:
                throw new Error('file type "' + file.format + '" is not supported');
        }

        return results;
    }
}
