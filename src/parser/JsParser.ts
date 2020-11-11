/* eslint-disable max-lines */
import {parseModule, parseScript, Program} from 'esprima';
import {ParserContract} from 'parser/ParserContract';
import {FileContract} from 'reader/FileContract';
import {IdentifierContract} from 'parser/IdentifierContract';
import {IdentifierType} from 'parser/IdentifierType';
import {LoggerContract} from 'logger/LoggerContract';
import {default as Features} from 'parser/Features';
import JsSyntaxConversionTable from 'parser/JsSyntaxConversionTable';

// Documentation
// https://esprima.readthedocs.io/en/4.0/syntax-tree-format.html#scripts-and-modules
// https://github.com/jquery/esprima/blob/master/docs/syntax-tree-format.md
export class JsParser implements ParserContract {
    private logger: LoggerContract;

    public constructor(logger: LoggerContract) {
        this.logger = logger;
    }

    public parse(file: FileContract): IdentifierContract[] {
        const identifiers: {[identifier: string]: IdentifierContract} = {};

        let ast: Program;
        try {
            ast = parseScript(file.content);
        } catch (scriptParsingError) {
            try {
                ast = parseModule(file.content);
            } catch (moduleParsingError) {
                this.logger.error('this file does not contain a valid javascript program', { scriptParsingError, moduleParsingError }); // TODO throw errors
                console.error({ scriptParsingError, moduleParsingError });
            }
        }

        if (ast !== undefined) {
            this.traverse(ast, identifiers);
        }
        //     enter: (node: any, _parent: any) => {
        //         switch (node.type) {
        //             case 'FunctionExpression':
        //                 if (node.async) {
        //                     identifier = 'async';
        //                     identifiers[identifier] = {
        //                         type: IdentifierType.KEYWORD,
        //                         name: identifier
        //                     };
        //                 } else if (node.generator) {
        //                     identifier = '*';
        //                     identifiers[identifier] = {
        //                         type: IdentifierType.KEYWORD,
        //                         name: identifier
        //                     };
        //                 }
        //                 break;
        //             case 'CallExpression':
        //                 identifier = this.parseCallExpression(node);
        //                 identifiers[identifier] = {
        //                     type: IdentifierType.FUNCTION,
        //                     name: identifier
        //                 };
        //
        //                 return estraverse.VisitorOption.Skip;
        //                 break;
        //             case 'ArrowFunctionExpression':
        //                 identifier = '=>';
        //                 identifiers[identifier] = {
        //                     type: IdentifierType.KEYWORD,
        //                     name: identifier
        //                 };
        //                 break;
        //             case 'RestElement':
        //                 identifier = '...';
        //                 identifiers[identifier] = {
        //                     type: IdentifierType.KEYWORD,
        //                     name: identifier
        //                 };
        //                 break;
        //         }
        //     }
        // });

        return Object.values(identifiers);
    }

    private traverse(node: any, identifiers: {[identifier: string]: IdentifierContract}): void {
        console.log('traverse', node);
        const numberOfIdentifiersBeforeParsing: number = Object.keys(identifiers).length;
        this.parseSyntaxAuto(node, identifiers, JsSyntaxConversionTable[node.type]);
        this.parseSyntax(node, identifiers);
        this.parseHeaderStatement(node, identifiers);
        this.parseBodyStatement(node, identifiers);
        this.parseExpression(node, identifiers);
        const numberOfIdentifiersAfterParsing: number = Object.keys(identifiers).length;

        if (numberOfIdentifiersBeforeParsing >= numberOfIdentifiersAfterParsing) {
            this.logger.warning('JSParser: unknwon node', {node: node});
        }

        Object.keys(node).forEach((key) => {
            if (typeof node[key] === 'object' && node[key] !== null) {
                this.traverse(node[key], identifiers);
            }
        });
    }

    private parseSyntaxAuto(node: any, identifiers: {[identifier: string]: IdentifierContract}, conversionTable: any): void {
        if (conversionTable !== undefined) {
            if (conversionTable.type !== undefined && conversionTable.feature !== undefined) {
                identifiers[conversionTable.feature] = {
                    type: conversionTable.type,
                    name: conversionTable.feature
                };
            } else {
                Object.keys(conversionTable).forEach((key) => {
                    if (node[key] !== undefined || node === key) {
                        this.parseSyntaxAuto(node[key], identifiers, conversionTable[key]);
                    }
                });
            }
        }
    }

    private parseSyntax(node: any, identifiers: {[identifier: string]: IdentifierContract}): void {
        switch (node.type) {
            case 'ClassDeclaration':
                this.addOperator(Features.operators.class, identifiers);
                this.addClass(Features.classes.class, identifiers);
                if (node.superClass !== null) {
                    this.addClass(Features.classes.extends, identifiers);
                }
                break;
            case 'MetaProperty':
                if (node.meta.name === 'new' && node.property.name === 'target') {
                    this.addOperator(Features.operators.new_target, identifiers);
                }
                break;
        }
    }

    private parseHeaderStatement(node: any, identifiers: {[identifier: string]: IdentifierContract}): void {
        switch (node.type) {
            case 'Program':
                // sourceType = module | script
                if (node.sourceType === 'module') {
                    this.addBuiltin(Features.builtins.Module, identifiers);
                }
                break;
            case 'ImportDeclaration':
            case 'ImportSpecifier':
            case 'ImportNamespaceSpecifier':
            case 'ImportDefaultSpecifier':
                this.addStatement(Features.statements.import, identifiers);
                // TODO
                // "dynamic_import": {},
                // "worker_support": {}
                break;
            case 'ExportDefaultDeclaration':
                this.addStatement(Features.statements.default.export, identifiers);
                break;
            case 'ExportAllDeclaration':
            case 'ExportNamedDeclaration':
            // case 'ExportSpecifier':
                this.addStatement(Features.statements.export, identifiers);
                break;
        }
    }

    private parseBodyStatement(node: any, identifiers: {[identifier: string]: IdentifierContract}): void {
        switch (node.type) {
            case 'BlockStatement':
                this.addStatement(Features.statements.block, identifiers); // TODO remove?
                break;
            case 'DebuggerStatement':
                this.addStatement(Features.statements.debugger, identifiers);
                break;
            case 'ExpressionStatement':
                break;
            case 'FunctionDeclaration':
                if (node.generator) {
                    // TODO generator
                } else if (node.async) {
                    this.addOperator(Features.operators.async_function_expression, identifiers);
                } else if (node.expression) {
                    // TODO expression
                }
                break;
            case 'SwitchCase':
                if (node.test === null) {
                    this.addStatement(Features.statements.default.switch, identifiers);
                }
                break;
            case 'TryStatement':
            case 'CatchClause':
                this.addStatement(Features.statements.try_catch, identifiers);
                // TODO
                // "conditional_clauses": {},
                // "optional_catch_binding": {}
                break;
            case 'VariableDeclarator':
                break;
        }
    }

    private parseExpression(node: any, identifiers: {[identifier: string]: IdentifierContract}): void {
        switch (node.type) {
            case 'Identifier':
                break;
            case 'Literal':
                break;
            case 'ArrayExpression':
                break;
            case 'ObjectExpression':
                break;
            case 'Property':
                // TODO 'get' | 'set' | 'init';
                break;
            case 'FunctionExpression':
                break;
            case 'BindingPattern':
                break;
            case 'ArrowFunctionExpression':
                break;
            case 'ClassExpression':
                break;
            case 'ClassBody':
                break;
            case 'MethodDefinition':
                switch (node.kind) {
                    case 'method':
                        // TODO
                        // "method_definitions": {
                        //     "async_generator_methods": {},
                        //     "async_methods": {},
                        //     "generator_methods_not_constructable": {}
                        // },
                        break;
                    case 'constructor':
                        this.addClass(Features.classes.constructor, identifiers);
                        break;
                }

                if (node.static) {
                    this.addClass(Features.classes.static, identifiers);
                }
                break;
            case 'TaggedTemplateExpression':
                break;
            case 'TemplateElement':
                break;
            case 'TemplateLiteral':
                break;
            case 'MemberExpression':
                break;
            case 'MetaProperty':
                if (node.meta.name === 'new' && node.property.name === 'target') {
                    this.addOperator(Features.operators.new_target, identifiers);
                }
                break;
            case 'SpreadElement':
                break;
            case 'CallExpression':
                break;
            case 'ConditionalExpression':
                break;
            case 'ArrayPattern':
                break;
            case 'RestElement':
                break;
            case 'AssignmentPattern':
                break;
            case 'ObjectPattern':
                break;
        }
    }

    private addBuiltin(builtin: string, identifiers: {[identifier: string]: IdentifierContract}): void {
        identifiers[builtin] = {
            type: IdentifierType.BUILTIN,
            name: builtin
        };
    }

    private addClass(identifier: string, identifiers: {[identifier: string]: IdentifierContract}): void {
        identifiers[identifier] = {
            type: IdentifierType.CLASS,
            name: identifier
        };
    }

    // private addFunction(func: string, identifiers: {[identifier: string]: IdentifierContract}): void {
    //     identifiers[func] = {
    //         type: IdentifierType.FUNCTION,
    //         name: func
    //     };
    // }
    //
    // private addGrammar(grammar: string, identifiers: {[identifier: string]: IdentifierContract}): void {
    //     identifiers[grammar] = {
    //         type: IdentifierType.GRAMMAR,
    //         name: grammar
    //     };
    // }

    private addOperator(operator: string, identifiers: {[identifier: string]: IdentifierContract}): void {
        identifiers[operator] = {
            type: IdentifierType.OPERATOR,
            name: operator
        };
    }

    private addStatement(statement: string, identifiers: {[identifier: string]: IdentifierContract}): void {
        identifiers[statement] = {
            type: IdentifierType.STATEMENT,
            name: statement
        };
    }

    // private parseCallExpression(expression: any, name: string = ''): string {
    //     switch (expression.type) {
    //         case 'CallExpression':
    //             name += this.parseCallExpression(expression.callee);
    //             break;
    //         case 'MemberExpression':
    //             switch (expression.object.type) {
    //                 case 'Identifier':
    //                     name += expression.object.name;
    //                     break;
    //                 default:
    //                     name += this.parseCallExpression(expression.object);
    //             }
    //             name += '.' + expression.property.name;
    //             break;
    //     }
    //     // console.log(expression.arguments);
    //
    //     return name;
    // }
}
