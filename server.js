// We can actually excute any JS file with node except for files that try to access something in dom because node is server side run time and there is no dom there.
const http = require('http');
// This is not package which has anything to do with package.json. but this is installed by default once you installed node js.
const server= http.createServer((req, resp) => {
  resp.end('This is first response');
});
// with that we created server but its not active yet.c
server.listen(process.env.PORT || 3000);
// start the server just using node server.js on command line
