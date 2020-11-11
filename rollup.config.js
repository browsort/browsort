import typescript from 'rollup-plugin-typescript2';
import {terser} from 'rollup-plugin-terser';

export default [
    {
        input: 'src/main.ts',
        output: [{
            file: 'bin/browsort.node.min.js',
            format: 'cjs',
            compact: true,
            sourcemap: false,
        }],
        plugins: [typescript({tsconfig: 'tsconfig.production.json'}), terser({output: {comments: false}})],
        external: ['yargs']
    },
    {
        input: 'src/process-data.ts',
        output: [{
            file: 'bin/data-processor.node.min.js',
            format: 'cjs',
            compact: true,
            sourcemap: false,
        }],
        plugins: [typescript({tsconfig: 'tsconfig.production.json'}), terser({output: {comments: false}})],
        external: ['caniuse-lite', 'colors', 'events', 'fs', 'lodash', 'mdn-browser-compat-data', 'path']
    }
];
