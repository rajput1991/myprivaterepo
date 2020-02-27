const exp = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // this variable name must match with the one when we create object using new User
const router = exp.Router();

router.post("/signup", (req, resp, next) => {
  console.log("reached at backend")
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save().then(result => {
      console.log(result);
      resp.status(201).json({
        message: 'user created',
        result: result
      });
    }).catch(err => {
    resp.status(500).json({

        message:'Invalid authentication credentials'

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

router.post("/login", (req, resp, next) => {
  let fetchedUser;
  // First find if email addrress exits
  User.findOne({ email: req.body.email }).then(user => {

    console.log(user);
    if (!user) {
      // means user does not exit in db
      return resp.status(401).json({
        message: 'Auth Failed'
      })
    }
    // here we know user exists then compare the password what user entered
    // problem is whatever stored in db hashed pwd and we cant unhash it
    // so how we will compare with the one user entered
   // but if you have the same input, you will always get the same hash.
   //So we can use a useful function bcrypt offers, the compare function to compare an input to an encrypted
//value and bcrypt will tell us if that input would yield the same value without needingto decrypt the encrypted value which would not be possible.
// user.password is the one stored in db
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
    console.log(result);
    if (!result) {
      //means successful match of password is not there , so return same error
      return resp.status(401).json({
        message:"Auth Failed"
      })

    }
// here we will have password match and we need to generate token here
    // install npm install --save jsonwebtoken
    // sign () method creates token based on input choice which is here json object of email, not the password becuase
    //i dont want to send back data to user even though password is encrypted
    // we are accessing user here but it exists only in first then block and not here
    const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, 'secret_this_should_be_longer', {
      expiresIn:"1h"
    });
    console.log(token); //not printing ,it means something is failing once we sign the token and its going to catch block
    resp.status(200).json({
      token: token,
      expiresIn: 3600, // use this at fronend
      // u can get this user ID from token as well by decoding . But decoding token will impact our performance at frontend.and so
      // we passing it as extra field.
      userId: fetchedUser._id
    })
  }).catch(err => {
    console.log(err); // it will show user is not defined
    // for some other errors if any
    return resp.status(401).json({
      message:"Auth Failed"
    })
  })

})

module.exports = router;
