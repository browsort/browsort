// import {expect} from 'chai';
import * as util from 'util';

describe.skip('', () => {
    beforeEach(() => {
    });

    afterEach(() => {
    });

    it('', async () => {
        const exec = util.promisify(require('child_process').exec);

        async function ls() {
            const { stdout, stderr } = await exec('ls');
            console.log('stdout:', stdout);
            console.log('stderr:', stderr);
        }
        await ls();
    });
});
