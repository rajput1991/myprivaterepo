const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema= mongoose.Schema({

  email: { type: String, required: true, unique:true } , // see moongoose docs  :schemaTypes,u can provide default value as well if it is not required
  password: { type: String, required: true }
  //Now I mention that we can't use unique here as a validator,however I want to make sure that I don't save user data or a user with the same user ID twice
//and thankfully, there is a package we can us
  //npm install --save mongoose-unique-validator
  // unique-validator is a plugin that will add an extra hook that checks ur data before u save it
});
userSchema.plugin(uniqueValidator);
//nd here we simply pass the unique validator. With that, we validate this
// now we will get an error if we try to save a user with an e-mail that does already exist.

// we need to define model on that schema
module.exports=mongoose.model('User',userSchema);
