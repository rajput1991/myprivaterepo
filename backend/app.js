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
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  //This OPTIONS is an implicit request sent by the browser by default prior to post requests for example to check whether the post request is valid, so even if you never directly send such an options request from within your angular app, it will implicitly
//be sent and therefore you should allow it as http verb.
  //now check angular app , you can see posts from server
  next();
})
app.put('/api/posts/:id', (req, resp, next) => {
  // at this point u will get error:Performing an update on the path '_id' would modify the immutable field '_id'
  //problem is on the backend we try to update existing post with the new post as shown below
  //but since we created a post like below , it will create new id too.
  // we could ofcourse delete old post and add new one but better add id also in below post because now we are not generating new
  //id rather re-using the existing id
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    console.log(result);
    resp.status(200).json({ message: 'Updated successfully' });
  })
});

app.post('/api/posts', (req, res, next) => {
  console.log("");
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  // now test it and check server log and see it has id . you can see node server console for ID
  // one thing missing is : lets connect our mongodb to node app and save this post
  // const post = req.body;
  //we need to extract incoming request data , use npm install --save body-parser. It will parse data and add that data to special property on req. object

  //console.log(post);
  // documents are stored in collection and we need name of collection. what will be the name of collection?
  // it would be plural form of ur model in lower case . see model name in post.js , so collection name ==posts automatically created in node-angular db
  // test via app now
  // u can see in db and choose option mongoshell from mongo cloud service and follow insttructions . >use node-angular , >help
  // show collections , db.posts.find()
  post.save().then(createdPost => {
    //console.log(createdPost); // it will return the post that was actually created
    // now beside the success message , we can send back post id as well.
    // now u can use this id in ur post service
    res.status(201).json({
      message: "Post added succesfully",
      postId: createdPost._id
    })
  });
  //rather than logging , lets store this post in db now

});
// step 2 an express app is a big chain of middleware
app.get('/api/posts', (req, resp, next) => {

 // console.log('second MW')
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
    then(documents => {
      //console.log(documents);
      resp.status(200).json({
        message: 'Posts fetched successfully',
        posts: documents
      });
    });

  // will return all result in collection
  //resp.json(posts);
  /// better u can send other object too


  //now u can access localhost:3000/api/posts and we will connect angular app to it using angular http client
});

// Implementing HTTP DELETE Operation on POST
// we need to send an ID in URL for deleting a POst with unique id and this needs to be dynamic because
// if we hardcoded id , it will delete only particular post
app.delete('/api/posts/:id', (req, resp, next) => {
  console.log('cominmg here ************************')
  //notice params is a property managed by express or node js indirectly which gives u access to all encoded params
  console.log(req.params.id);
  console.log("Deleting from server side $$$$$$$$$$$$$$$$$$$$$$$$$$$$")
  // see query api documentation for DELETE
  // updated delete method
  Post.deleteOne({ _id: req.params.id }).then(result => {
   // console.log(result);
    resp.status(200).json({ message: 'Post Deleted' });
    // now you should not see post at frontend because we acutally deleted from backend..if you reload the app, observer same
    //thought we updated the backend db by deleting post from db but our frontend is not lively updated
    // if we click the DELETE , we need to wait for next reload for updation of GUI
  });

  // now lets connect to angular frontend with this , we have already DELETE button in frontend
});

// step 3 now we have to wire up our express app with node js server written in server.js
module.exports = app;
