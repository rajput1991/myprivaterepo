const express = require('express');
const bodyParser = require('body-parser');
// step 1 create a express app
const app = express();

//user for all incoming req. on any path
app.use(bodyParser.json());


app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-origin', '*');
  //this * means no matter which domain the app which is sending the request is running on, it's allowed to access our resources,
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With,Content-Type,Accept");
  // this 4 header we added means, incoming req. might have these headers and it will be allowed.
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  //This OPTIONS is an implicit request sent by the browser by default prior to post requests for example to check whether the post request is valid, so even if you never directly send such an options request from within your angular app, it will implicitly
//be sent and therefore you should allow it as http verb.
  //now check angular app , you can see posts from server
  next();
})

app.post('/api/posts', (req,res,next) => {
  console.log("");
  const post = req.body;
  //we need to extract incoming request data , use npm install --save body-parser. It will parse data and add that data to special property on req. object

  console.log(post);
  res.status(201).json({
    message: "Post added succesfully"
  })
})
// step 2 an express app is a big chain of middleware
app.use('/api/posts',(req,resp,next) => {
  {
    console.log('second MW')
    //next(); // so request wont travel down because we not calling next();
    //resp.send('Hellow from express app');
    //later these posts can come from DB ofcourse
    const posts = [
      { id: '484n349nd', title: 'Firsts server side Post', content: 'This is coming from server' },
      { id: '484n349nd', title: 'second server side Post', content: 'This is coming from server' }
    ]
    //resp.json(posts);
    /// better u can send other object too
     resp.status(200).json({
      message: 'Posts fetched successfully',
      posts:posts
    }
    )
    //now u can access localhost:3000/api/posts and we will connect angular app to it using angular http client

}})

// step 3 now we have to wire up our express app with node js server written in server.js
module.exports = app;
