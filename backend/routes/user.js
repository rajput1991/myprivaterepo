const exp = require('express');
const bcrypt = require('bcrypt');
const user = require('../models/user');
const router = exp.Router();
router.post("/signup", (req, resp, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new user({
      email: req.body.email,
      password: hash
    })
    user.save().then(result => {
      resp.status(201).json({
        message: 'user created',
        result: result
   })
    }).catch(err => {
    resp.status(500).json({
      error:err
    })
  })
  })
  // const user = new user({
  //   email: req.body.email,
  //   password: req.body.password
    // if anyone has access to user db , he can read raw password
    // we should encrypt it in a way that it cant be decrypted rather than using in raw form
    // for this use npm install --save bcrypt
 // })

})

module.exports = router;
