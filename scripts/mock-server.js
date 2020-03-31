/* eslint-disable import/no-commonjs */

const express = require('express');
const path = require('path');
const fs = require('fs');
const mockerAPI = require('mocker-api');
const chalk = require('chalk');
const conf = require('../config/conf');

const app = express();
const mockRoot = path.join(__dirname, '../mock');
const mockFiles = [];

fs.readdir(mockRoot, (err, files) => {
  files.forEach((file) => {
    const filePath = path.resolve(mockRoot, file);
    mockFiles.push(filePath);
  });
  mockerAPI(app, mockFiles);
});


app.listen(conf.mockPort, (err) => {
  if (err) {
    console.error(err.stack);
    process.exit(1);
  }
  console.log('\n');
  console.log(chalk.bgGreen.whiteBright(' Mock服务启动成功 '), `Listen at http://${conf.localIP}:${conf.mockPort} ${new Date()}`);
  console.log(chalk.cyan('提示：输入`mock`后按Enter键可重启Mock服务'), '\n');
});
