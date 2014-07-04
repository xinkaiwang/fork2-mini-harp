var fs = require('fs');
var path = require('path');
var url = require('url');
var jade = require('jade');

module.exports = makeJade;

function makeJade(root) {
  function jadeProcessor(req, resp, next) {
    var parsedurl = url.parse(req.url);
    if (path.extname(parsedurl.pathname) === 'html') {
      var htmlfilepath = path.join(root, parsedurl.pathname);
      fs.exists(htmlfilepath, function(exist) {
        if (!exist) {
          var jadefilepath = path.join(root, path.basename(parsedurl));
          fs.exists(jadefilepath, function(exist) {
            if (exist) {
              fs.readFile(jadefilepath, {encoding:"utf8"}, function(err, jadefile) {
                if (err) {
                  console.log(err);
                  next();
                }
                else {
                  var html = jade.render(jadefile, options);
                  resp.end(html);
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
    next();
  }
  return jadeProcessor;
}


