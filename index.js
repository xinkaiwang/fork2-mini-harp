var connect = require('connect');
var serverStatic = require('serve-static');
var makejade = require('./lib/processor/jade.js');

function createMiniHarp(rootPath) {
  var app = connect();
  if (rootPath) {
    app.use(makejade(rootPath));
    app.use(serverStatic(rootPath));
  }
  return app;
}

module.exports = createMiniHarp;
