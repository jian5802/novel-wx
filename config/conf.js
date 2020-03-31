/* eslint-disable import/no-commonjs */
const path = require('path');
const localIP = require('ip').address();

const BUILD_ENV = process.env.BUILD_ENV;

// 微信appid
const WX_APPID_MAP = {
  test: 'wxe95485a6596ea987', /* 读者阅书test */
  prod: 'pro95485a6596ea987' /* 读者阅书 */
};

let WX_APPID;
if (BUILD_ENV === 'prod') {
  WX_APPID = WX_APPID_MAP.prod;
} else {
  WX_APPID = WX_APPID_MAP.test;
}

module.exports = {
  WX_APPID,
  BUILD_ENV,
  localIP,
  mockPort: 3001, // mock服务端口
  projectDir: path.join(__dirname, '..')
};

