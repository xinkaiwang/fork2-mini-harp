var connect = require('connect');
var serverStatic = require('serve-static');
var defaultpage = require('./lib/processor/defaultpage.js');
var makejade = require('./lib/processor/jade.js');
var makeless = require('./lib/processor/less.js');

function createMiniHarp(rootPath) {
  var app = connect();
  if (rootPath) {
    app.use(defaultpage(rootPath));
    app.use(makejade(rootPath));
    app.use(makeless(rootPath));
    app.use(serverStatic(rootPath));
  }
  return app;
}

module.exports = createMiniHarp;
