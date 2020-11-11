export default {
    builtins: {
        Module: 'Module'
    },
    classes: {
        class: 'class',
        constructor: 'constructor',
        extends: 'extends',
        static: 'static'
    },
    functions: {

    },
    grammar: {

    },
    operators: {
        assignment: {
            addition: 'assignment.addition',
            bitwise_and: 'assignment.bitwise_and',
            bitwise_xor: 'assignment.bitwise_xor',
            bitwise_or: 'assignment.bitwise_or',
            division: 'assignment.division',
            exponentiation: 'assignment.exponentiation',
            left_shift: 'assignment.left_shift',
            multiplication: 'assignment.multiplication',
            remainder: 'assignment.remainder',
            right_shift: 'assignment.right_shift',
            simple: 'assignment.simple',
            subtraction: 'assignment.subtraction',
            unsigned_right_shift: 'assignment.unsigned_right_shift'
        },
        arithmetic: {
            addition: 'arithmetic.addition',
            decrement: 'arithmetic.decrement',
            division: 'arithmetic.division',
            exponentiation: 'arithmetic.exponentiation',
            increment: 'arithmetic.increment',
            multiplication: 'arithmetic.multiplication',
            remainder: 'arithmetic.remainder',
            subtraction: 'arithmetic.subtraction',
            unary_negation: 'arithmetic.unary_negation',
            unary_plus: 'arithmetic.unary_plus'
        },
        async_function_expression: 'async_function_expression',
        await: 'await',
        bitwise: {
            and: 'bitwise.and',
            left_shift: 'bitwise.left_shift',
            not: 'bitwise.not',
            or: 'bitwise.or',
            right_shift: 'bitwise.right_shift',
            unsigned_right_shift: 'bitwise.unsigned_right_shift',
            xor: 'bitwise.xor'
        },
        class: 'class',
        comma: 'comma',
        comparison: {
            equality: 'comparison.equality',
            inequality: 'comparison.inequality',
            identity: 'comparison.identity',
            non_identity: 'comparison.non_identity',
            greater_than: 'comparison.greater_than',
            greater_than_or_equal: 'comparison.greater_than_or_equal',
            less_than: 'comparison.less_than',
            less_than_or_equal: 'comparison.less_than_or_equal'
        },
        delete: 'delete',
        instanceof: 'instanceof',
        logical: {
            and: 'logical.and',
            or: 'logical.or',
            not: 'logical.not'
        },
        this: 'this',
        typeof: 'typeof',
        new_target: 'new_target',
        new: 'new',
        void: 'void',
        super: 'super',
        yield: 'yield'
    },
    statements: {
        block: 'block',
        break: 'break',
        class: 'class',
        const: 'const',
        continue: 'continue',
        debugger: 'debugger',
        do_while: 'do_while',
        empty: 'empty',
        export: 'export',
        for: 'for',
        for_in: 'for_in',
        for_of: 'for_of',
        if_else: 'if_else',
        import: 'import',
        label: 'label',
        let: 'let',
        return: 'return',
        switch: 'switch',
        default: {
            export: 'default.export',
            switch: 'default.switch'
        },
        throw: 'throw',
        try_catch: 'try_catch',
        var: 'var',
        while: 'while',
        with: 'with'
    }
}
