module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": 'babel-eslint',
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module",
        "allowImportExportEverywhere": true
    },
    "plugins": [
        "react"
    ],
    "rules": {
        'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx']}],
        'no-dupe-args': 1,
        'no-dupe-keys': 1,
        'no-empty': 1,
        'no-extra-parens': 1,
        'block-scoped-var': 1,
        'no-else-return': 1,
        'no-extra-bind': 1,
        'no-redeclare': 1,
        'no-self-assign': 1,
        'no-useless-return': 1,
        'require-await': 1,
        'no-label-var': 1,
        'no-undef-init': 1,
        'array-bracket-newline': 1,
        'array-bracket-spacing': 1,
        'block-spacing': 1,
        'brace-style': 1,
        camelcase: 1,
        'comma-dangle': 1,
        "indent": [1, 2],
        'key-spacing': 1,
        'jsx-quotes': 1,
        'keyword-spacing': 1,
        // 'max-len': 1,
        "max-len": [
            1, 100, 2, {
                ignoreUrls: true,
                ignoreComments: true,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: false
            }
        ],
        'no-lonely-if': 1,
        'no-mixed-spaces-and-tabs': 1,
        'no-negated-condition': 1,
        'no-nested-ternary': 0,
        'no-plusplus': 1,
        'no-trailing-spaces': 1,
        'no-unneeded-ternary': 1,
        'object-curly-spacing': 1,
        'object-property-newline': 1,
        'one-var-declaration-per-line': 1,
        'semi-spacing': 1,
        'semi-style': 1,
        'space-before-blocks': 1,
        'space-before-function-paren': 1,
        'space-in-parens': 1,
        'switch-colon-spacing': 1,
        'arrow-spacing': 1,
        'no-const-assign': 1,
        'no-duplicate-imports': 1,
        'no-var': 1,
        'prefer-arrow-callback': 1,
        'prefer-const': 1,
        'prefer-destructuring': 1,
        'no-console': [1, {allow: ['warn', 'error']}],
        'react/jsx-props-no-spreading': 'off',
        'react/no-unescaped-entities': 'off',
        'react/prop-types': 'off',
        'import/prefer-default-export': 'off'
    }
};