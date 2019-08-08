const express = require('express');
const bodyParser = require('body-parser');
// step 1 create a express app
const app = express();
const Post = require('./models/post');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const mongoose= require('mongoose'); // to connect to node app
/// connect method here will actually return promise . Notice test is db name and u can oveeride this
mongoose.connect('mongodb+srv://root:hwroot@cluster0-j03ig.mongodb.net/node-angular?retryWrites=true&w=majority')
.then(()=>{
console.log('Connected to database')
// u can see this in node js server log ..once server starts
})
.catch(()=>{
console.log('connection failed')
});

//user for all incoming req. on any path
app.use(bodyParser.json());


app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-origin', '*');
  //this * means no matter which domain the app which is sending the request is running on, it's allowed to access our resources,
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With,Content-Type,Accept");
  // this 4 header we added means, incoming req. might have these headers and it will be allowed.
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  //This OPTIONS is an implicit request sent by the browser by default prior to post requests for example to check whether the post request is valid, so even if you never directly send such an options request from within your angular app, it will implicitly
//be sent and therefore you should allow it as http verb.
  //now check angular app , you can see posts from server
  next();
})
app.use('/api/posts', postRoutes);
app.use('/api/user',userRoutes);


// step 3 now we have to wire up our express app with node js server written in server.js
module.exports = app;
