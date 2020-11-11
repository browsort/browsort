import {FileContract} from 'reader/FileContract';
import {IdentifierContract} from 'parser/IdentifierContract';

export interface ParserContract {
    parse(file: FileContract): IdentifierContract[];
}
