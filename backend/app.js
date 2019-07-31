const express=require('express');
// step 1 create a express app
const app=express();
// step 2 an express app is a big chain of middleware
app.use((req, resp, next) => {
  {
    console.log('First MW')
    next();
  }
});
app.use((req,resp,next) => {
  {
    console.log('second MW')
    //next(); // so request wont travel down because we not calling next();
    resp.send('Hellow from express app')
}})

// step 3 now we have to wire up our express app with node js server written in server.js
module.exports = app;
