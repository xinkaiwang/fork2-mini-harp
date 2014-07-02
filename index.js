var connect = require('connect');
var serverStatic = require('serve-static');

function createMiniHarp(rootPath) {
  var app = connect();
  if (rootPath) {
    app.use(serverStatic(rootPath));
  }
  return app;
}

module.exports = createMiniHarp;
