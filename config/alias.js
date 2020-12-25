/* eslint-disable import/no-commonjs */
const path = require('path');

function resolve(dir = '') {
  return path.resolve(__dirname, '..', dir);
}

module.exports = {
  'src': resolve('src'),
  'assets': resolve('src/assets'),
  'actions': resolve('src/actions'),
  'store': resolve('src/store'),
  'hooks': resolve('src/hooks'),
  'common': resolve('src/common'),
  '@': resolve('src/components'),
  'api': resolve('src/api')
};
