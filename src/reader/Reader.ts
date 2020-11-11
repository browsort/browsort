import * as fs from 'fs';
import * as path from 'path';
import {ReaderContract} from 'reader/ReaderContract';
import {FileContract} from 'reader/FileContract';
import {Format} from 'reader/Format';
import {LoggerContract} from 'logger/LoggerContract';
import {asyncForEach} from 'tool/helpers';

export class Reader implements ReaderContract {
    public constructor(_logger: LoggerContract) {
        // nothing
    }

    public async file(filePath: string): Promise<FileContract> {
        if (!this.isFile(filePath)) {
            throw new Error(filePath + ' does not exist or is not a file');
        }

        return await this.fileFactory(filePath);
    }

    public async dir(dirPath: string, recursive: boolean = true): Promise<FileContract[]> {
        return await this.traverse(dirPath, recursive);
    }

    private async traverse(dirPath: string, recursive: boolean): Promise<FileContract[]> {
        if (!this.isDir(dirPath)) {
            throw new Error(dirPath + ' does not exist or is not a directory');
        }

        let results: FileContract[] = [];
        await asyncForEach(fs.readdirSync(dirPath), async (nodeName) => {
            const nodePath = path.resolve(dirPath, nodeName);
            if (this.isDir(nodePath)) {
                if (recursive) {
                    results = results.concat(await this.traverse(nodePath, recursive));
                }
            } else if (this.isFile(nodePath)) {
                results.push(await this.fileFactory(nodePath));
            }
        });

        return results;
    }

    private async fileFactory(filePath: string): Promise<FileContract> {
        return new Promise<FileContract>((resolve, reject) => {
            if (!fs.existsSync(filePath)) {
                throw new Error('file ' + filePath + ' does not exist');
            }

            const extension: string = path.extname(filePath).substring(1);
            const format: Format = (extension === 'js' ? Format.JS : Format.UNKNOWN);

            fs.readFile(filePath, 'utf-8', (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        name: path.basename(filePath),
                        path: path.dirname(filePath),
                        format: format,
                        content: data
                    });
                }
            });
        });
    }

    private isDir(dirPath: string): boolean {
        return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
    }

    private isFile(filePath: string): boolean {
        return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
    }
}
