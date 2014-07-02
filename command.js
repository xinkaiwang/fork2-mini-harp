var createMiniHarp = require("./");

var argv = require("minimist")(process.argv.slice(2));

function command() {
  var app = createMiniHarp();
  var port = argv.port || 4000;
  console.log("Starting mini-harp on http://localhost:" + port);

  app.use(function(request, response, next) {
    var url = request.url.split('/');
    if(url[1] == 'CurrentTime') {
      response.end((new Date()).toISOString());
    }
    else {
      next();
    }
  });
  app.listen(port);
}

module.exports = command;
