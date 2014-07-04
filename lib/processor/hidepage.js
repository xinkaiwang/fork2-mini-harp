var path = require('path');
var url = require('url');

module.exports = hidepage;

function hidepage() {
  function processor(req, resp, next) {
    var parsedurl = url.parse(req.url);
    if (path.extname(parsedurl.pathname) === '.jade') {
      resp.statusCode = 404;
      resp.end('not found');
    }
    else if (path.extname(parsedurl.pathname) === '.less') {
      resp.statusCode = 404;
      resp.end('not found');
    }
    else {
      next();
    }
  }
  return processor;
}

