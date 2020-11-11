import * as fs from 'fs';
import * as path from 'path';

export class Writer {
    public static json(filePath: string, data: object, minify: boolean = true): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const stream: any = fs.createWriteStream(path.resolve(filePath));
            stream.on('error', reject);
            stream.once('open', () => {
                stream.write(minify ? JSON.stringify(data) : JSON.stringify(data, null, 2));
                stream.end();
                resolve();
            });
        });
    }
}
