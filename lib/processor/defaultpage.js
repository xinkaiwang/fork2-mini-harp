var path = require('path');
var url = require('url');

module.exports = defaultpage;

function defaultpage() {
  function processor(req, resp, next) {
    var parsedurl = url.parse(req.url);
    if (parsedurl.pathname === '/') {
      parsedurl.pathname = '/index.html';
      req.url = url.format(parsedurl);
    }
    next();
  }
  return processor;
}

