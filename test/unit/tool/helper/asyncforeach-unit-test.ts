import {expect} from 'chai';
import {asyncForEach} from 'tool/helpers';

describe('Helper - asyncForEach', () => {
    it('should keep order', async () => {
        const input: number[] = [10, 5, 2];
        const output: number[] = [];
        const asyncFunc: (value: number) => Promise<void> = (value) => {
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    output.push(value);
                    resolve();
                }, value);
            });
        };

        await asyncForEach(input, asyncFunc);
        expect(input).to.deep.equal(output);
    });
});
