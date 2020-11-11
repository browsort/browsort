import {expect} from 'chai';
import {ParserContract} from 'parser/ParserContract';
import {JsParser} from 'parser/JsParser';
import {IdentifierContract} from 'parser/IdentifierContract';
import {IdentifierType} from 'parser/IdentifierType';
import {Format} from 'reader/Format';
import {LoggerMockup} from 'mockup/LoggerMockup';

describe('JavaScript Parser - Builtin', () => {
    const dataProvider: {name: string, program: string, identifiers: IdentifierContract[]}[] = [
        {name: 'module import', program: 'import {isArray} from "lodash";', identifiers: [
            {type: IdentifierType.BUILTIN, name: 'Module'}
        ]},
        {name: 'module export', program: 'export {default} from "lodash";', identifiers: [
            {type: IdentifierType.BUILTIN, name: 'Module'}
        ]}
    ];

    dataProvider.forEach((test) => {
        it(String(test.name), () => {
            const jsParser: ParserContract = new JsParser(new LoggerMockup());
            const identifiers: IdentifierContract[] = jsParser.parse({
                name: 'builtin',
                format: Format.JS,
                path: '/path/to/folder/',
                content: test.program
            }).filter((identifier) => identifier.type === IdentifierType.BUILTIN);

            expect(identifiers).to.be.not.empty;
            console.log('identifiers', identifiers);
            expect(identifiers).to.deep.equal(test.identifiers);
        }).retries(0);
    });
});
