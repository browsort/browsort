import * as fs from 'fs';
import * as path from 'path';
import {ReaderContract} from 'reader/ReaderContract';
import {FileContract} from 'reader/FileContract';

export class Reader implements ReaderContract {
    public async file(filePath: string): Promise<FileContract> {
        if (!this.isFile(filePath)) {
            throw new Error(filePath + ' does not exist or is not a file');
        }

        return this.fileFactory(filePath);
    }

    public async dir(dirPath: string, recursive: boolean = true): Promise<FileContract[]> {
        return this.traverse(dirPath, recursive, []);
    }

    private traverse(dirPath: string, recursive: boolean, results: FileContract[] = []): FileContract[] {
        if (!this.isDir(dirPath)) {
            throw new Error(dirPath + ' does not exist or is not a directory');
        }

        fs.readdirSync(dirPath).forEach((filename) => {
            const filePath = path.resolve(dirPath, filename);
            if (this.isDir(filePath)) {
                if (recursive) {
                    results.concat(this.traverse(filePath, recursive, []));
                }
            } else if (this.isFile(filePath)) {
                results.push(this.fileFactory(filePath));
            }
        });

        return results;
    }

    private fileFactory(filePath: string): FileContract {
        if (!fs.existsSync(filePath)) {
            throw new Error('file ' + filePath + ' does not exist');
        }

        const extension: string = path.extname(filePath);

        return {
            name: path.basename(filePath, extension),
            extension: extension.substring(1),
            path: path.dirname(filePath),
            content: fs.readFileSync(filePath, 'utf8')
        }
    }

    private isDir(dirPath: string): boolean {
        return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
    }

    private isFile(filePath: string): boolean {
        return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
    }
}
