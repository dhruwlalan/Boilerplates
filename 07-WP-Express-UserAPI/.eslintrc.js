module.exports = {
   extends: ['airbnb-base', 'prettier'],
   env: {
      es2021: true,
      browser: true,
      node: true,
   },
   ignorePatterns: ['node_modules'],
   parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
         impliedStrict: true,
      },
   },
   rules: {
      'no-console': 0,
      'spaced-comment': 0,
      'consistent-return': 0,
      'no-param-reassign': 0,
      'no-underscore-dangle': 0,
      'class-methods-use-this': 0,
      'func-names': 0,
      'prefer-destructuring': 0,
      'no-unused-vars': ['error', { vars: 'all', args: 'none', ignoreRestSiblings: false }],
      quotes: [
         2,
         'single',
         {
            avoidEscape: true,
            allowTemplateLiterals: true,
         },
      ],
      'import/no-extraneous-dependencies': 0,
      'import/no-unresolved': 0,
      'global-require': 0,
      'prettier/prettier': [
         'error',
         {
            trailingComma: 'all',
            singleQuote: true,
            printWidth: 200,
            endOfLine: 'auto',
         },
      ],
   },
   plugins: ['prettier'],
};
