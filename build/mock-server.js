/* eslint-disable import/no-commonjs */

const express = require('express');
const path = require('path');
const fs = require('fs');
const mockerAPI = require('mocker-api');
const chokidar = require('chokidar');
const ip = require('ip');

const app = express();
const mockRoot = path.resolve(__dirname, '../mock');

function handleMock() {
  fs.readdir(mockRoot, (err, files) => {
    const mockFiles = [];
    files.forEach((file) => {
      const filePath = path.resolve(mockRoot, file);
      mockFiles.push(filePath);
    });
    mockerAPI(app, mockFiles);
  });
}

chokidar
  .watch(mockRoot, { persistent: true })
  .on('add', handleMock)
  .on('unlink', handleMock);

handleMock();

app.listen(3000, (err) => {
  if (err) {
    console.error(err.stack);
    process.exit(1);
  }
  console.log(`Mock server started, listen at http://${ip.address()}:3000 ${new Date()}`);
});
