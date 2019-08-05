const express = require('express');
const bodyParser = require('body-parser');
// step 1 create a express app
const app = express();
const Post= require('./models/post');
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
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  //This OPTIONS is an implicit request sent by the browser by default prior to post requests for example to check whether the post request is valid, so even if you never directly send such an options request from within your angular app, it will implicitly
//be sent and therefore you should allow it as http verb.
  //now check angular app , you can see posts from server
  next();
})

app.post('/api/posts', (req,res,next) => {
  console.log("");
  const post= new Post({
    title: req.body.title,
    content: req.body.content
  });
  // now test it and check server log and see it has id . you can see node server console for ID
  // one thing missing is : lets connect our mongodb to node app and save this post
 // const post = req.body;
  //we need to extract incoming request data , use npm install --save body-parser. It will parse data and add that data to special property on req. object

  console.log(post);
  // documents are stored in collection and we need name of collection. what will be the name of collection?
  // it would be plural form of ur model in lower case . see model name in post.js , so collection name ==posts automatically created in node-angular db
  // test via app now
  // u can see in db and choose option mongoshell from mongo cloud service and follow insttructions . >use node-angular , >help
  // show collections , db.posts.find()
  post.save();
  //rather than logging , lets store this post in db now
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

    // till now we retruring dummy data to client
    // notice on front end we using id while on backend we using _id on server side. we have rename it. 
    // we have to map like documents.map and map _id to id. but id does not matter because we not showing that on front end
    // now reload the angular app.. u will see data by default which is there in db
    const posts = [
      { id: '484n349nd', title: 'Firsts server side Post', content: 'This is coming from server' },
      { id: '484n349nd', title: 'second server side Post', content: 'This is coming from server' }
    ]
    Post.find().
    then(documents=>{
console.log(documents);
resp.status(200).json({
  message: 'Posts fetched successfully',
  posts:documents
}
)
    });
    
    // will return all result in collection
    //resp.json(posts);
    /// better u can send other object too

    
    //now u can access localhost:3000/api/posts and we will connect angular app to it using angular http client

}})

// step 3 now we have to wire up our express app with node js server written in server.js
module.exports = app;
