/* eslint-env node */

const OFF = 0, WARN = 1, ERROR = 2;

module.exports = {
    "rules": {
        "semi": [ERROR, "always", {"omitLastInOneLineBlock": true}],
        "@typescript-eslint/explicit-function-return-type": ERROR,
        "@typescript-eslint/no-extra-semi": ERROR,

        // onStateEnter expects function that returns void but the game returns a Promise
        "@typescript-eslint/no-misused-promises": OFF,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        "project": ["tsconfig.json"]
    },
    root: true,
};
