const mongoose =require('mongoose');
const postSchema= mongoose.Schema({
 //title: String; // notice in Ts lower case s for string but for nodejs and js general upper case  but u can define in more better way
  title: { type: String,required=true } , // see moongoose docs ,u can provide default value as well if it is not required
  content: { type: String,required=true } 
});
// we created schema till now
// so we defined schema , mongoose needs a model to work with it.
// the schema is just a blue print , not the thing we work with in our code.
// we need to define model on that schema
module.exports=moongoose.model('Post',postSchema);