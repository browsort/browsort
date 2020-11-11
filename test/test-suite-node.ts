import * as glob from 'glob';
import * as process from 'process';
import * as path from 'path';

(global as any).BASE_PATH_TEST_DATA = path.resolve('data/test/') + '/';

// Tests
let unitTestPattern: string = 'test/unit/**/*.ts';
let integrationTestPattern: string = 'test/integration/**/*.ts';
process.argv.forEach((value, index) => {
    switch (value) {
        case '--unit':
            if (process.argv[index + 1] === 'no') {
                unitTestPattern = undefined;
            } else if (/^[^\.]+(\.)[a-z]+$/i.exec(process.argv[index + 1])) {
                unitTestPattern = 'test/unit/**/' + process.argv[index + 1];
            } else {
                unitTestPattern = 'test/unit/' + process.argv[index + 1] + '/*.ts';
            }
            break;
        case '--integration':
            if (process.argv[index + 1] === 'no') {
                integrationTestPattern = undefined;
            } else if (/^[^\.]+(\.)[a-z]+$/i.exec(process.argv[index + 1])) {
                integrationTestPattern = 'test/integration/**/' + process.argv[index + 1];
            } else {
                integrationTestPattern = 'test/integration/' + process.argv[index + 1] + '/*.ts';
            }
            break;
    }
});

const unitTestList: string[] = unitTestPattern === undefined ? [] : glob.sync(unitTestPattern);
const integrationTestList: string[] = integrationTestPattern === undefined ? [] : glob.sync(integrationTestPattern);

unitTestList.concat(integrationTestList).forEach((testFilePath) => {
    require(testFilePath);
});
