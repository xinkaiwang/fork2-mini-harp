var http = require("http");

var server = http.createServer(function(req,res) {
  var i = 0;
  function tick() {
    i++;

    res.write(String(i)+"\n");
    setTimeout(tick,500);
  }

  tick();
});

server.listen(4000);

