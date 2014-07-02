var createMiniHarp = require("./");

var root = process.cwd(); // current directory
var app = createMiniHarp(root);
console.log("Starting mini-harp on http://localhost:4000");
app.listen(4000);
