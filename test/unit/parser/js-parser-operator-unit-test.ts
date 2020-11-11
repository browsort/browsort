import {expect} from 'chai';
import {ParserContract} from 'parser/ParserContract';
import {JsParser} from 'parser/JsParser';
import {IdentifierContract} from 'parser/IdentifierContract';
import {IdentifierType} from 'parser/IdentifierType';
import {Format} from 'reader/Format';
import {LoggerMockup} from 'mockup/LoggerMockup';

describe('JavaScript Parser - Operator', () => {
    const dataProvider: {name: string, program: string, identifiers: IdentifierContract[]}[] = [
        // {name: '=', program: 'var a = 1; a = 2;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'assignment.simple'}
        // ]},
        // {name: '*=', program: 'var a = 10; a *= 2;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'assignment.multiplication'}
        // ]},
        // {name: '/=', program: 'var a = 10; a /= 2;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'assignment.division'}
        // ]},
        // {name: '+=', program: 'var a = 0; a += 1;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'assignment.addition'}
        // ]},
        // {name: '-=', program: 'var a = 0; a -= 1;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'assignment.subtraction'}
        // ]},
        // {name: '%=', program: 'var a = 20; a %= 2;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'assignment.remainder'}
        // ]},
        // {name: '**=', program: 'var a = 5; a **= 2;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'assignment.exponentiation'}
        // ]},
        // {name: '<<=', program: 'var a = 5; a <<= 2;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'assignment.left_shift'}
        // ]},
        // {name: '>>=', program: 'var a = 5; a >>= 2;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'assignment.right_shift'}
        // ]},
        // {name: '>>>=', program: 'var a = 5; a >>>= 2;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'assignment.unsigned_right_shift'}
        // ]},
        // {name: '&=', program: 'var a = 5; a &= 2;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'assignment.bitwise_and'}
        // ]},
        // {name: '^=', program: 'var a = 5; a ^= 2;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'assignment.bitwise_xor'}
        // ]},
        // {name: '|=', program: 'var a = 5; a |= 2;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'assignment.bitwise_or'}
        // ]},
        // {name: '==', program: 'var a = 10 == 20;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'comparison.equality'}
        // ]},
        // {name: '===', program: 'var a = 10 === 20;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'comparison.identity'}
        // ]},
        // {name: '!=', program: 'var a = 10 != 20', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'comparison.inequality'}
        // ]},
        // {name: '!==', program: 'var a = 10 !== 20;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'comparison.non_identity'}
        // ]},
        // {name: '>', program: 'var a = 10 > 20;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'comparison.greater_than'}
        // ]},
        // {name: '>=', program: 'var a = 10 >= 20;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'comparison.greater_than_or_equal'}
        // ]},
        // {name: '<', program: 'var a = 10 < 20;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'comparison.less_than'}
        // ]},
        // {name: '<=', program: 'var a = 10 <= 20;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'comparison.less_than_or_equal'}
        // ]},
        // {name: '10 + 20', program: 'var a = 10 + 20;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'arithmetic.addition'}
        // ]},
        // {name: '10 - 20', program: 'var a = 10 - 20;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'arithmetic.subtraction'}
        // ]},
        // {name: '10 * 20', program: 'var a = 10 * 20;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'arithmetic.multiplication'}
        // ]},
        // {name: '10 / 20', program: 'var a = 10 / 20;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'arithmetic.division'}
        // ]},
        // {name: '20 % 10', program: 'var a = 20 % 10;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'arithmetic.remainder'}
        // ]},
        // {name: '((20 % 10) + 5) * 10', program: 'var a = ((20 % 10) + 5) * 10;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'arithmetic.multiplication'},
        //     {type: IdentifierType.OPERATOR, name: 'arithmetic.addition'},
        //     {type: IdentifierType.OPERATOR, name: 'arithmetic.remainder'}
        // ]},
        // {name: 'grouping', program: 'var a = 10 + (5 * 2);', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'arithmetic.addition'},
        //     {type: IdentifierType.OPERATOR, name: 'arithmetic.multiplication'}
        // ]},
        // {name: 'no grouping', program: 'var a = 10 + 5 * 2;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'arithmetic.addition'},
        //     {type: IdentifierType.OPERATOR, name: 'arithmetic.multiplication'}
        // ]},
        // {name: '5 ** 2', program: 'var a = 5 ** 2;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'arithmetic.exponentiation'}
        // ]},
        // {name: 'i++', program: 'var i=0;i++;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'arithmetic.increment'}
        // ]},
        // {name: 'i--', program: 'var i=10;i--;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'arithmetic.decrement'}
        // ]},
        // {name: '+1', program: 'var a = +1;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'arithmetic.unary_plus'}
        // ]},
        // {name: '-1', program: 'var a = -1;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'arithmetic.unary_negation'}
        // ]},
        // {name: 'async / await', program: 'function resolveAfter2Seconds(x) {return new Promise(function (resolve) {setTimeout(function () {resolve(x);}, 2000);});}' +
        //         'async function f1() {var x = await resolveAfter2Seconds(10);}f1();', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'new'},
        //     {type: IdentifierType.OPERATOR, name: 'async_function_expression'},
        //     {type: IdentifierType.OPERATOR, name: 'await'}
        // ]},
        // {name: 'Bitwise AND', program: 'var a = 0, b = 1;var c = a & b;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'bitwise.and'}
        // ]},
        // {name: 'bitwise OR', program: 'var a = 0, b = 1;var c = a | b;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'bitwise.or'}
        // ]},
        // {name: 'bitwise XOR', program: 'var a = 0, b = 1;var c = a ^ b;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'bitwise.xor'}
        // ]},
        // {name: 'bitwise NOT', program: 'var a = 0;var b = ~ a;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'bitwise.not'}
        // ]},
        // {name: 'bitwise left shift', program: 'var a = 0, b = 1;var c = a << b;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'bitwise.left_shift'}
        // ]},
        // {name: 'bitwise right shift', program: 'var a = 0, b = 1;var c = a >> b;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'bitwise.right_shift'}
        // ]},
        // {name: 'bitwise unsigned right shift', program: 'var a = 0, b = 1;var c = a >>> b;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'bitwise.unsigned_right_shift'}
        // ]},
        {name: 'class', program: 'class Toto {}', identifiers: [
            {type: IdentifierType.OPERATOR, name: 'class'}
        ]},
        // {name: 'comma 1', program: 'var a, b, c;a = b = 3, c = 4;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'comma'},
        //     {type: IdentifierType.OPERATOR, name: 'assignment.simple'}
        // ]},
        // {name: 'comma 2', program: 'var x, y, z;x = (y = 5, z = 6);', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'assignment.simple'},
        //     {type: IdentifierType.OPERATOR, name: 'comma'}
        // ]},
        // {name: 'delete', program: 'var a = {b: 1};delete a.b;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'delete'}
        // ]},
        // {name: 'instanceof', program: 'var a = o1 instanceof Object', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'instanceof'}
        // ]},
        // {name: 'logical var = and', program: 'var b = true && false', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'logical.and'}
        // ]},
        // {name: 'logical if (and)', program: 'if (b && c) {}', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'logical.and'}
        // ]},
        // {name: 'logical var = or', program: 'var b = true || false', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'logical.or'}
        // ]},
        // {name: 'logical if (or)', program: 'if (b || c) {}', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'logical.or'}
        // ]},
        // {name: 'logical if (or and)', program: 'if (b || c && a) {}', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'logical.or'},
        //     {type: IdentifierType.OPERATOR, name: 'logical.and'}
        // ]},
        // {name: 'logical var !not', program: 'var a = !true', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'logical.not'}
        // ]},
        // {name: 'logical if (!not)', program: 'if (!true) {}', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'logical.not'}
        // ]},
        // {name: 'double not (!!)', program: 'var n1 = !!true', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'logical.not'}
        // ]},
        // {name: 'super', program: 'class Rectangle {constructor() {}};class Square extends Rectangle {constructor() {super();}}', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'super'}
        // ]},
        // {name: 'typeof object', program: 'typeof o1', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'typeof'}
        // ]},
        // {name: 'typeof number', program: 'typeof 3', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'typeof'}
        // ]},
        // // {name: 'typeof bigint', program: 'typeof 42n', identifiers: [
        // //     {type: IdentifierType.OPERATOR, name: 'typeof'}
        // // ]},
        // {name: 'typeof string', program: 'typeof ""', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'typeof'}
        // ]},
        // {name: 'typeof boolean', program: 'typeof true', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'typeof'}
        // ]},
        // {name: 'typeof Symbol', program: 'typeof Symbol()', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'typeof'}
        // ]},
        // {name: 'typeof undefined', program: 'typeof undefined', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'typeof'}
        // ]},
        // {name: 'typeof function', program: 'typeof function() {}', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'typeof'}
        // ]},
        // {name: 'this function', program: 'function foo() { return this; }', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'this'}
        // ]},
        // {name: 'this', program: 'if (this) {}', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'this'}
        // ]},
        // {name: 'this in object', program: 'const obj = {prop: 42, func: function() {return this.prop;}}', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'this'}
        // ]},
        // {name: 'this assign', program: 'this.a = 42;', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'assignment.simple'},
        //     {type: IdentifierType.OPERATOR, name: 'this'}
        // ]},
        // {name: 'new', program: 'new CustomClass();', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'new'}
        // ]},
        // {name: 'new.target', program: 'function Foo() {if (!new.target) {}}', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'logical.not'},
        //     {type: IdentifierType.OPERATOR, name: 'new_target'}
        // ]},
        // {name: 'new.target', program: 'function Foo() {if (new.target) {}}', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'new_target'}
        // ]},
        // {name: 'void 1', program: 'void (2 === "2")', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'void'},
        //     {type: IdentifierType.OPERATOR, name: 'comparison.identity'}
        // ]},
        // {name: 'void 2', program: 'void function iife() {}();', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'void'}
        // ]},
        // {name: 'yield', program: 'function* foo() { yield 1; }', identifiers: [
        //     {type: IdentifierType.OPERATOR, name: 'yield'}
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
            }).filter((identifier) => identifier.type === IdentifierType.OPERATOR);

            expect(identifiers).to.be.not.empty;
            console.log('identifiers', identifiers);
            expect(identifiers).to.deep.equal(test.identifiers);
        }).retries(0);
    });
});
