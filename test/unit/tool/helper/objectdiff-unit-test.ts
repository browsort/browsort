import {expect} from 'chai';
import {objectDiff} from 'tool/helpers';

describe('Helper - objectDiff', () => {
    const dataProvider: {name: string, input1: object, input2: object, output: object}[] = [
        {name: 'diff 1', input1: {c: 4, a: 2}, input2: {a: 1, b: 2}, output: {c: 4}},
        {name: 'diff 2', input1: {}, input2: {}, output: {}},
        {name: 'diff 3', input1: {a: 10, b: 278}, input2: {a: 20, b: 200}, output: {}},
        {name: 'diff 4', input1: {c: 4}, input2: {b: 2}, output: {c: 4}},
        {name: 'diff 5', input1: {c: {a: 1, b: 2}, a: 2}, input2: {a: 1, c: {b: 1}}, output: {c: {a: 1}}},
        {name: 'diff 6', input1: {c: {a: 1, b: {m: 2837}, e: {p: {}}}, a: 2}, input2: {a: 1, c: {b: 1}, e: {d: 27634}}, output: {c: {a: 1, b: {m: 2837}, e: {p: {}}}}},
        {name: 'diff 7', input1: {a: {b: {c: {}}}}, input2: {a: {b: {c: 2}}}, output: {}},
        {name: 'diff 8', input1: {a: {b: {c: {}}}}, input2: {a: {b: 2973}}, output: {a: {b: {c: {}}}}}
    ];

    dataProvider.forEach((test) => {
        it(String(test.name), () => {
            expect(objectDiff(test.input1, test.input2)).to.deep.equal(test.output);
        });
    });
});
