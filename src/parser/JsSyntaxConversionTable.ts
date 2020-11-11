import {default as Features} from 'parser/Features';
import {IdentifierType} from 'parser/IdentifierType';

export default {
    AssignmentExpression: {
        operator: {
            '=': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.assignment.simple
            },
            '*=': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.assignment.multiplication
            },
            '**=': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.assignment.exponentiation
            },
            '/=': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.assignment.division
            },
            '%=': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.assignment.remainder
            },
            '+=': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.assignment.addition
            },
            '-=': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.assignment.subtraction
            },
            '<<=': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.assignment.left_shift
            },
            '>>=': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.assignment.right_shift
            },
            '>>>=': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.assignment.unsigned_right_shift
            },
            '&=': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.assignment.bitwise_and
            },
            '^=': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.assignment.bitwise_xor
            },
            '|=': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.assignment.bitwise_or
            }
        }
    },
    AwaitExpression: {
        type: IdentifierType.OPERATOR,
        feature: Features.operators.await
    },
    BinaryExpression: {
        operator: {
            'instanceof': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.instanceof
            },
            'in': {},
            '+': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.arithmetic.addition
            },
            '-': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.arithmetic.subtraction
            },
            '*': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.arithmetic.multiplication
            },
            '/': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.arithmetic.division
            },
            '%': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.arithmetic.remainder
            },
            '**': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.arithmetic.exponentiation
            },
            '|': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.bitwise.or
            },
            '^': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.bitwise.xor
            },
            '&': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.bitwise.and
            },
            '==': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.comparison.equality
            },
            '===': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.comparison.identity
            },
            '!=': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.comparison.inequality
            },
            '!==': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.comparison.non_identity
            },
            '<': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.comparison.less_than
            },
            '>': {
                type: IdentifierType.OPERATOR,
               feature: Features.operators.comparison.greater_than
            },
            '>=': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.comparison.greater_than_or_equal
            },
            '<=': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.comparison.less_than_or_equal
            },
            '<<': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.bitwise.left_shift
            },
            '>>': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.bitwise.right_shift
            },
            '>>>': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.bitwise.unsigned_right_shift
            }
        }
    },
    BreakStatement: {
        type: IdentifierType.STATEMENT,
        feature: Features.statements.break
    },
    ClassDeclaration: {
        type: IdentifierType.STATEMENT,
        feature: Features.statements.class
    },
    ContinueStatement: {
        type: IdentifierType.STATEMENT,
        feature: Features.statements.continue
    },
    DoWhileStatement: {
        type: IdentifierType.STATEMENT,
        feature: Features.statements.do_while
    },
    EmptyStatement: {
        type: IdentifierType.STATEMENT,
        feature: Features.statements.empty
    },
    ForStatement: {
        type: IdentifierType.STATEMENT,
        feature: Features.statements.for
    },
    ForInStatement: {
        type: IdentifierType.STATEMENT,
        feature: Features.statements.for_in
    },
    ForOfStatement: {
        type: IdentifierType.STATEMENT,
        feature: Features.statements.for_of
        // TODO
        // "async_iterators": {},
        // "closing_iterators": {}
    },
    IfStatement: {
        type: IdentifierType.STATEMENT,
        feature: Features.statements.if_else
    },
    LabeledStatement: {
        type: IdentifierType.STATEMENT,
        feature: Features.statements.label
    },
    'LogicalExpression': {
        operator: {
            '||': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.logical.or
            },
            '&&': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.logical.and
            }
        }
    },
    NewExpression: {
        type: IdentifierType.OPERATOR,
        feature: Features.operators.new
    },
    ReturnStatement: {
        type: IdentifierType.STATEMENT,
        feature: Features.statements.return
    },
    SequenceExpression: {
        type: IdentifierType.OPERATOR,
        feature: Features.operators.comma
    },
    Super: {
        type: IdentifierType.OPERATOR,
        feature: Features.operators.super
    },
    SwitchStatement: {
        type: IdentifierType.STATEMENT,
        feature: Features.statements.switch
    },
    ThisExpression: {
        type: IdentifierType.OPERATOR,
        feature: Features.operators.this
    },
    ThrowStatement: {
        type: IdentifierType.STATEMENT,
        feature: Features.statements.throw
    },
    UnaryExpression: {
        operator: {
            '+': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.arithmetic.unary_plus
            },
            '-': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.arithmetic.unary_negation
            },
            '~': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.bitwise.not
            },
            '!': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.logical.not
            },
            'delete': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.delete
            },
            'void': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.void
            },
            'typeof': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.typeof
            }
        }
    },
    UpdateExpression: {
        operator: {
            '++': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.arithmetic.increment
            },
            '--': {
                type: IdentifierType.OPERATOR,
                feature: Features.operators.arithmetic.decrement
            }
        }
    },
    VariableDeclaration: {
        kind: {
            const: {
                type: IdentifierType.STATEMENT,
                feature: Features.statements.const
            },
            let: {
                type: IdentifierType.STATEMENT,
                feature: Features.statements.let
            },
            var: {
                type: IdentifierType.STATEMENT,
                feature: Features.statements.var
            }
        }
    },
    WhileStatement: {
        type: IdentifierType.STATEMENT,
        feature: Features.statements.while
    },
    WithStatement: {
        type: IdentifierType.STATEMENT,
        feature: Features.statements.with
    },
    YieldExpression: {
        type: IdentifierType.OPERATOR,
        feature: Features.operators.yield
    }
} as any;
