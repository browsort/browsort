import {Format} from 'reader/Format';

export interface FileContract {
    name: string,
    format: Format,
    path: string,
    content: string
}
