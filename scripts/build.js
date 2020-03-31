/* eslint-disable import/no-commonjs */

const fs = require('fs');
const cp = require('child_process');
const path = require('path');
const chalk = require('chalk');
const TaroCLI = require('@tarojs/cli');
const conf = require('../config/conf');

const BUILD_TYPE = {
  WEAPP: 'weapp'
};

const watch = process.argv.includes('--watch');

/**
 * 更新微信小程序appId
 */
function updateWxAppId() {
  const projectConfig = require('../project.config.json');
  const appid = conf.WX_APPID;
  if (!appid) {
    console.log(chalk.bgRed.whiteBright(' ERROR '), chalk.red('微信appid不能为空'));
    process.exit(1);
  }

  projectConfig.appid = appid;
  const filename = path.join(__dirname, '../project.config.json');
  const data = JSON.stringify(projectConfig, null, '  ');
  fs.writeFileSync(filename, data);
}

/**
 * 设置node环境变量
 */
function setEnvironment() {
  if (conf.BUILD_ENV === 'dev') {
    process.env.NODE_ENV = 'development';
  } else {
    process.env.NODE_ENV = 'production';
  }
}

/**
 * 构建
 */
function build(type) {
  const builder = new TaroCLI.default.Builder(conf.projectDir);
  builder.build({
    type,
    release: false,
    watch,
  });
}


let mockProcess;

/**
 * 启动mock服务
 */
function runMockServer(restart = false) {
  if (mockProcess && !mockProcess.killed) {
    mockProcess.kill();
  }

  mockProcess = cp.spawn(
    'node',
    [path.join(__dirname, './mock-server.js')],
    { stdio: 'inherit' }
  );

  if (!restart) {
    process.stdin.on('data', data => {
      data = data.toString().replace(/^\s*(.*?)\s*$/, '$1');
      if (data === 'mock') {
        runMockServer(true);
        console.log(chalk.bgGreen.whiteBright(' Mock服务重启成功 '));
      }
    });
  }
}

if (watch) {
  runMockServer();
}

// 开始构建
setEnvironment();
updateWxAppId();
build(BUILD_TYPE.WEAPP);



