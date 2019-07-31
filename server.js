// We can actually excute any JS file with node except for files that try to access something in dom because node is server side run time and there is no dom there.
const http = require('http');
// This is not package which has anything to do with package.json. but this is installed by default once you installed node js.
const app = require('./backend/app')
const port = process.env.PORT || 3000;
app.set('port', port);
const server = http.createServer(app);
// with that we created server but its not active yet.c
server.listen(port);
// start the server just using node server.js on command line

// --------------------------
// Lets use express js framework for node js which makes node js developement easier.
// install it using npm install --save express
