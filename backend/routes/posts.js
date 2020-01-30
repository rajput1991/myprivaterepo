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
  })

});
router.put('/:id',checkAuth, (req, resp, next) => {
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

// adding creater property too
router.post('', checkAuth,(req, res, next) => {
  console.log("");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    // since it uses checkAuth , so we have extra data from req. object that we setting in req. object
   // creater:

  });
  // just to test if userData is coming and we are returning before saving the post , just to test
  console.log(req.userData);
  return res.status(200).json({});

  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added succesfully",
      postId: createdPost._id
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
    });
});

router.delete('/:id',checkAuth, (req, resp, next) => {
  console.log('cominmg here ************************')
  console.log(req.params.id);
  console.log("Deleting from server side $$$$$$$$$$$$$$$$$$$$$$$$$$$$")
  Post.deleteOne({ _id: req.params.id }).then(result => {
   // console.log(result);
    resp.status(200).json({ message: 'Post Deleted' });

  });
});
module.exports = router;
