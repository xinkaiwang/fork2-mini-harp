var fs = require('fs');
var path = require('path');
var url = require('url');
var less = require('less');

module.exports = makeLess;

function makeLess(root) {
  function lessProcessor(req, resp, next) {
    var parsedurl = url.parse(req.url);
    if (path.extname(parsedurl.pathname) === '.css') {
      var htmlfilepath = path.join(root, parsedurl.pathname);
      fs.exists(htmlfilepath, function(exist) {
        if (!exist) {
          var filename = path.basename(parsedurl.pathname, ".css") + ".less";
          var jadefilepath = path.join(root, filename);
          fs.exists(jadefilepath, function(exist) {
            if (exist) {
              fs.readFile(jadefilepath, {encoding:"utf8"}, function(err, jadefile) {
                if (err) {
                  console.log(err);
                  next();
                }
                else {
                  less.render(jadefile, function (e, css) {
                    if(e) {
                      console.log(e);
                      next();
                    }
                    resp.end(css);
                  });
                }
              });
            }
            else {
              next(); // both .jade and .html does not exist
            }
          });
        }
        else {
          next(); // .html exist. let default static handler to handle it.
        }
      });
    }
    else {
      next();
    }
  }
  return lessProcessor;
}

