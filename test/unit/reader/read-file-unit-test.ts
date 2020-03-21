// import {expect} from 'chai';

import {ReaderContract} from 'reader/ReaderContract';
import {Reader} from 'reader/Reader';
import {FileContract} from 'reader/FileContract';
import {expect} from 'chai';

describe('Read File', () => {
    it('read javascript file', async () => {
        const reader: ReaderContract = new Reader();
        const file: FileContract = await reader.file((global as any).BASE_PATH_TEST_DATA + 'javascript/object.assign.js');
        expect(file.name).to.be.not.empty;
        expect(file.extension).to.equal('js');
        expect(file.path).to.be.not.empty;
        expect(file.content).to.be.not.empty;
    });

    it('should not be able to read a directory as a file', async () => {
        const reader: ReaderContract = new Reader();
        try {
            await reader.file((global as any).BASE_PATH_TEST_DATA);
            expect(true, 'should throw an error').to.be.false;
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.include('file');
        }
    });

    it('read non existing file', async () => {
        const reader: ReaderContract = new Reader();
        try {
            await reader.file('/unknow/file/path/script.js');
            expect(true, 'should throw an error').to.be.false;
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.include('exist');
        }
    });
});
