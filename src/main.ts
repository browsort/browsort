import * as yargs from 'yargs';

yargs.usage('Usage: browsort <command> [options]')
    .command('min', 'Count the lines in a file')
    .example('$0 count -f foo.js', 'count the lines in the given file')
    .example('$0 count -f foo.js', 'count the lines in the given file')
    .describe('f', 'Analyze a file').nargs('f', 1).alias('f', 'file')
    .describe('d', 'Analyze a dir').nargs('d', 1).alias('d', 'dir')
    .demandOption(['f', 'd'])
    .help('h').alias('h', 'help');

const args: any = yargs.argv;

console.log(args);
