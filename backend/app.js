const express=require('express');
// step 1 create a express app
const app=express();
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
