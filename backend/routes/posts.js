const exp= require('express');
const Post= require('../models/post');
const router = exp.Router();
const checkAuth = require('../middleware/check-auth');
// now u can add this middleware to any route to protect same
// try posting a post and see console.log , u will se 401 ofcourse we need to handle same at frontend also
//eventhough u try to delete the post, u wil get 401

router.get('/:id', (req, resp, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      resp.status(200).json(post);
    }
    else {
      resp.status(404).json({ message: 'Post not found' });
    }
  }).catch(error => {
    res.status(500).json({
      message:'Fetching Post failed.'
    })
  });

});
router.put('/:id',checkAuth, (req, resp, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    creater: req.userId.userId
  });
  // iF both conditions matched, then only post will be updated.Means one post cant be updated by other user.
  // see network outgoing req. and test with  users editing the post
  Post.updateOne({ _id: req.params.id ,creater:req.userData.userId}, post).then(result => {
    console.log(result); // will give nModified property to see if post updated or not . Try with both user.
    // so use that
    if (result.nModified > 0) {
      resp.status(200).json({ message: 'Updated successfully' });
    }
    else {
      resp.status(401).json({ message: 'Not authorized!' });
    }
  }).catch(error => {
    // e..e.g db connection lost because of that post could not updated.
    res.status(500).json({
      message:'Could not update post.'
    })
  });
});

// adding creater property too
router.post('', checkAuth,(req, res, next) => {
  console.log("");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    // since it uses checkAuth , so we have extra data from req. object that we setting in req. object
    creater: req.userData.userId
   // so we can store user Id as part of our post

  });
  // just to test if userData is coming and we are returning before saving the post , just to test
  //console.log(req.userData);
  //return res.status(200).json({});

  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added succesfully",
      postId: createdPost._id
    })
  }).catch(error => {
    res.status(500).json({
      message:'Creating a Post failed.'
    })
  });

});

router.get('', (req, resp, next) => {
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
    }).catch(error => {
      res.status(500).json({
        message:'Fetching posts failed.'
      })
    });
});

router.delete('/:id',checkAuth, (req, resp, next) => {
  console.log('cominmg here ************************')
  console.log(req.params.id);
  console.log("Deleting from server side $$$$$$$$$$$$$$$$$$$$$$$$$$$$")
  Post.deleteOne({ _id: req.params.id,creater: req.userData.userId }).then(result => {
    console.log(result);

   if (result.n > 0) {
    resp.status(200).json({ message: 'Deletting successfully' });
  }
  else {
    resp.status(401).json({ message: 'Not authorized!' });
  }

  }).catch(error => {
    res.status(500).json({
      message:'Deleting Post failed.'
    })
  });
});
module.exports = router;
