import {FileContract} from 'reader/FileContract';

export interface ReaderContract {
    // TODO COMMENT
    file(filePath: string): Promise<FileContract>;
    dir(dirPath: string, recursive?: boolean): Promise<FileContract[]>;
}
