const exp= require('express');
const Post= require('../models/post');
const router = exp.Router();

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
router.put('/:id', (req, resp, next) => {
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

router.post('', (req, res, next) => {
  console.log("");
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

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

router.delete('/:id', (req, resp, next) => {
  console.log('cominmg here ************************')
  console.log(req.params.id);
  console.log("Deleting from server side $$$$$$$$$$$$$$$$$$$$$$$$$$$$")
  Post.deleteOne({ _id: req.params.id }).then(result => {
   // console.log(result);
    resp.status(200).json({ message: 'Post Deleted' });

  });
});
module.exports = router;
