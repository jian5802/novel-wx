
module.exports = {
  'extends': [
    'taro',
    'plugin:proposal/recommended'
  ],
  'rules': {
    'react/sort-comp': 'off',
    'taro/this-props-function': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': ['error', {
      'varsIgnorePattern': 'Taro'
    }],
    'react/jsx-filename-extension': [1, {
      'extensions': ['.js', '.jsx', '.tsx']
    }],
    'react/jsx-tag-spacing': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'indent': ['error', 2, {
      'SwitchCase': 1,
      'flatTernaryExpressions': true,
    }],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  },
  parser: 'babel-eslint'
};
