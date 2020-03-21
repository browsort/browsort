import {expect} from 'chai';
import {ReaderContract} from 'reader/ReaderContract';
import {Reader} from 'reader/Reader';
import {FileContract} from 'reader/FileContract';

describe('Read Directory', () => {
    it('read the javascript folder', async () => {
        const reader: ReaderContract = new Reader();
        const files: FileContract[] = await reader.dir((global as any).BASE_PATH_TEST_DATA + 'javascript/', false);
        expect(files).to.have.lengthOf.at.least(1);
        expect(files[0].name).to.be.not.empty;
        expect(files[0].extension).to.equal('js');
        expect(files[0].path).to.be.not.empty;
        expect(files[0].content).to.be.not.empty;
    });

    it('recursive reading', async () => {
        const reader: ReaderContract = new Reader();
        const files: FileContract[] = await reader.dir((global as any).BASE_PATH_TEST_DATA, true);
        expect(files).to.have.lengthOf.at.least(1);
        expect(files[0].name).to.be.not.empty;
        expect(files[0].extension).to.be.not.empty;
        expect(files[0].path).to.be.not.empty;
        expect(files[0].content).to.be.not.empty;
    });

    it('should not be able to read a file as a directory', async () => {
        const reader: ReaderContract = new Reader();
        try {
            await reader.dir('./read-dir-unit-test.ts');
            expect(true, 'should throw an error').to.be.false;
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.include('directory');
        }
    });

    it('read non existing folder', async () => {
        const reader: ReaderContract = new Reader();
        try {
            await reader.dir('/unknow/folder/path/');
            expect(true, 'should throw an error').to.be.false;
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.include('exist');
        }
    });
});
