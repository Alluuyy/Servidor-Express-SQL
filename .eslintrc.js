module.exports = {
    env: {
        node: true,
        es2021: true
    },
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'script'
    },
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'windows'],
        quotes: ['error', 'single'],
        semi: ['error', 'always']
    }
};
