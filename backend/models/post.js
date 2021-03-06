const mongoose =require('mongoose');
const postSchema= mongoose.Schema({
 //title: String; // notice in Ts lower case s for string but for nodejs and js general upper case  but u can define in more better way
  title: { type: String, required: true } , // see moongoose docs  :schemaTypes,u can provide default value as well if it is not required
  content: { type: String, required: true } ,
  creater: { type: mongoose.Schema.Types.ObjectId,ref: "User", required: true }
  // we need to tell mongoose : to which model this ID belongs using ref property
});
// we created schema till now
// so we defined schema , mongoose needs a model to work with it.
// the schema is just a blue print , not the thing we work with in our code.
// we need to define model on that schema
module.exports=mongoose.model('Post',postSchema);
