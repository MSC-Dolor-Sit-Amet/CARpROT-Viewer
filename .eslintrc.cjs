// For jest and gatsby config, see https://github.com/d4rekanguok/gatsby-typescript/blob/master/.eslintrc.js
module.exports = {
  overrides: [
    {
      // JavaScript and JSX
      files: ['*.{js,jsx}'],
      parserOptions: {
        sourceType: 'module',
      },
      extends: ['airbnb', 'airbnb/hooks', 'prettier', 'prettier/react'],
      plugins: ['prettier'],
    },
    {
      // Typescript and TSX
      // See https://github.com/toshi-toma/eslint-config-airbnb-typescript-prettier/blob/master/index.js
      files: ['*.{jsx,ts,tsx}'],
      extends: ['airbnb-typescript-prettier'],
    },
  ],
  rules: {
    'max-len': [
      'error',
      {
        code: 100,
        ignoreUrls: true,
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'linebreak-style': 0,
  },
};
