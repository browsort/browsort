import {expect} from 'chai';
import {ParserContract} from 'parser/ParserContract';
import {JsParser} from 'parser/JsParser';
import {IdentifierContract} from 'parser/IdentifierContract';
import {IdentifierType} from 'parser/IdentifierType';
import {Format} from 'reader/Format';
import {LoggerMockup} from 'mockup/LoggerMockup';

describe('JavaScript Parser', () => {
    const dataProvider: {name: string, program: string, identifiers: IdentifierContract[]}[] = [
        {name: 'var', program: 'var o1 = 1;', identifiers: [
            {type: IdentifierType.STATEMENT, name: 'var'}
        ]},
        {name: 'let', program: 'let o1 = "test";', identifiers: [
            {type: IdentifierType.STATEMENT, name: 'let'}
        ]},
        {name: 'const', program: 'const o1 = {};', identifiers: [
            {type: IdentifierType.STATEMENT, name: 'const'}
        ]},
        {name: 'try_catch', program: 'try {} catch (error) {}', identifiers: [
            {type: IdentifierType.STATEMENT, name: 'try_catch'},
            {type: IdentifierType.STATEMENT, name: 'block'}
        ]},
        {name: 'throw', program: 'throw error;', identifiers: [
            {type: IdentifierType.STATEMENT, name: 'throw'}
        ]},
        {name: 'while', program: 'while(true) {}', identifiers: [
            {type: IdentifierType.STATEMENT, name: 'while'},
            {type: IdentifierType.STATEMENT, name: 'block'}
        ]},
        {name: 'do_while', program: 'do {} while (true);', identifiers: [
            {type: IdentifierType.STATEMENT, name: 'do_while'},
            {type: IdentifierType.STATEMENT, name: 'block'}
        ]},
        {name: 'while & break', program: 'while(true) { break; }', identifiers: [
            {type: IdentifierType.STATEMENT, name: 'while'},
            {type: IdentifierType.STATEMENT, name: 'block'},
            {type: IdentifierType.STATEMENT, name: 'break'}
        ]},
        {name: 'class', program: 'class Toto {}', identifiers: [
            {type: IdentifierType.STATEMENT, name: 'class'}
        ]},
        {name: 'for & let', program: 'for(let i = 0; i < 10; i++) {}', identifiers: [
            {type: IdentifierType.STATEMENT, name: 'for'},
            {type: IdentifierType.STATEMENT, name: 'let'},
            {type: IdentifierType.STATEMENT, name: 'block'}
        ]},
        {name: 'switch', program: 'switch (12) {case 1:break;default:}', identifiers: [
            {type: IdentifierType.STATEMENT, name: 'switch'},
            {type: IdentifierType.STATEMENT, name: 'break'},
            {type: IdentifierType.STATEMENT, name: 'default.switch'}
        ]},
        {name: 'import default', program: 'import defaultExport from "module-name";', identifiers: [
            {type: IdentifierType.STATEMENT, name: 'import'}
        ]},
        {name: 'import', program: 'import { export1 } from "module-name";', identifiers: [
            {type: IdentifierType.STATEMENT, name: 'import'}
        ]},
        {name: 'import', program: 'import defaultExport, * as name from "module-name";', identifiers: [
            {type: IdentifierType.STATEMENT, name: 'import'}
        ]},
        // {name: 'import dynamic', program: 'import "module-name";', identifiers: [
        //     {type: IdentifierType.STATEMENT, name: 'import.dynamic_import'}
        // ]},
        // {name: 'import dynamic', program: 'import("module-name");', identifiers: [
        //     {type: IdentifierType.STATEMENT, name: 'import.dynamic_import'}
        // ]},
        // {name: 'import meta', program: 'import.meta', identifiers: [
        //     {type: IdentifierType.STATEMENT, name: 'import_meta'}
        // ]},
        {name: 'export function', program: 'export function functionName(){}', identifiers: [
            {type: IdentifierType.STATEMENT, name: 'export'},
            {type: IdentifierType.STATEMENT, name: 'block'}
        ]},
        {name: 'export list', program: 'export { name1, name2 };', identifiers: [
            {type: IdentifierType.STATEMENT, name: 'export'}
        ]},
        {name: 'renaming exports', program: 'export { variable1 as name1, variable2 as name2, nameN };', identifiers: [
            {type: IdentifierType.STATEMENT, name: 'export'}
        ]},
        {name: 'exporting destructured assignments with renaming', program: 'export const { name1, name2: bar } = o;', identifiers: [
            {type: IdentifierType.STATEMENT, name: 'export'},
            {type: IdentifierType.STATEMENT, name: 'const'}
        ]},
        {name: 'export default', program: 'export default function () {}', identifiers: [
            {type: IdentifierType.STATEMENT, name: 'default.export'},
            {type: IdentifierType.STATEMENT, name: 'block'}
        ]},
        {name: 'aggregating modules', program: 'export { default } from "lodash";', identifiers: [
            {type: IdentifierType.STATEMENT, name: 'export'}
        ]}
    ];

    dataProvider.forEach((test) => {
        it(String(test.name), () => {
            const jsParser: ParserContract = new JsParser(new LoggerMockup());
            const identifiers: IdentifierContract[] = jsParser.parse({
                name: 'statement',
                format: Format.JS,
                path: '/path/to/folder/',
                content: test.program
            }).filter((identifier) => identifier.type === IdentifierType.STATEMENT);

            expect(identifiers).to.be.not.empty;
            expect(identifiers).to.deep.equal(test.identifiers);
        });
    });
});
