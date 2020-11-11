import {expect} from 'chai';
import {ParserContract} from 'parser/ParserContract';
import {JsParser} from 'parser/JsParser';
import {IdentifierContract} from 'parser/IdentifierContract';
import {IdentifierType} from 'parser/IdentifierType';
import {Format} from 'reader/Format';
import {LoggerMockup} from 'mockup/LoggerMockup';

describe('JavaScript Parser - Class', () => {
    const dataProvider: {name: string, program: string, identifiers: IdentifierContract[]}[] = [
        {name: 'simple class', program: 'class manager {}', identifiers: [
            {type: IdentifierType.CLASS, name: 'class'}
        ]},
        {name: 'extends', program: 'class formatDate extends Date {}', identifiers: [
            {type: IdentifierType.CLASS, name: 'class'},
            {type: IdentifierType.CLASS, name: 'extends'}
        ]},
        {name: 'constructor', program: 'class Toto {constructor() {}}', identifiers: [
            {type: IdentifierType.CLASS, name: 'class'},
            {type: IdentifierType.CLASS, name: 'constructor'}
        ]},
        // TODO EXPERIMENTAL: ESPRIMA SUPPORT IS MISSING
        // {name: 'public static field', program: 'class ClassWithStaticField {static staticField = "static field";}', identifiers: [
        //     {type: IdentifierType.CLASS, name: 'class'},
        //     {type: IdentifierType.CLASS, name: 'static_class_fields'}
        // ]},
        // TODO EXPERIMENTAL: ESPRIMA SUPPORT IS MISSING
        // {name: 'public instance field', program: 'class ClassWithInstanceField {instanceField = "instance field";}', identifiers: [
        //     {type: IdentifierType.CLASS, name: 'class'},
        //     {type: IdentifierType.CLASS, name: 'public_class_fields'}
        // ]},
        {name: 'public static method', program: 'class ClassWithStaticMethod {static staticMethod() {return "static method has been called.";}}', identifiers: [
            {type: IdentifierType.CLASS, name: 'class'},
            {type: IdentifierType.CLASS, name: 'static'}
        ]},
        {name: 'public instance method', program: 'class ClassWithPublicInstanceMethod {publicMethod() {return "hello world";}}', identifiers: [
            {type: IdentifierType.CLASS, name: 'class'}
        ]},
        // TODO EXPERIMENTAL: ESPRIMA SUPPORT IS MISSING
        // {name: 'private static field', program: 'class ClassWithPrivateStaticField { static #PRIVATE_STATIC_FIELD; }', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'class'}
        // ]},
        // TODO EXPERIMENTAL: ESPRIMA SUPPORT IS MISSING
        // {name: 'private instance field', program: 'class ClassWithPrivateField {#privateField;constructor() {this.#privateField = 42; }}', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'class'}
        // ]},
        // TODO EXPERIMENTAL: ESPRIMA SUPPORT IS MISSING
        // {name: 'private static method', program: 'class ClassWithPrivateStaticMethod {static #privateStaticMethod() {return 42;}}', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'class'}
        // ]}
    ];

    dataProvider.forEach((test) => {
        it(String(test.name), () => {
            const jsParser: ParserContract = new JsParser(new LoggerMockup());
            const identifiers: IdentifierContract[] = jsParser.parse({
                name: 'operator',
                format: Format.JS,
                path: '/path/to/folder/',
                content: test.program
            }).filter((identifier) => identifier.type === IdentifierType.CLASS);

            expect(identifiers).to.be.not.empty;
            expect(identifiers).to.deep.equal(test.identifiers);
        });
    });
});
