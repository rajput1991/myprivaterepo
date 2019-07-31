// // We can actually excute any JS file with node except for files that try to access something in dom because node is server side run time and there is no dom there.
// const http = require('http');
// // This is not package which has anything to do with package.json. but this is installed by default once you installed node js.
// const app = require('./backend/app')
// const port = process.env.PORT || 3000;
// app.set('port', port);
// const server = http.createServer(app);
// // with that we created server but its not active yet.c
// server.listen(port);
// // start the server just using node server.js on command line

// // --------------------------
// // Lets use express js framework for node js which makes node js developement easier.
// // install it using npm install --save express
const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
