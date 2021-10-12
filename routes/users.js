const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/twt');

const userSchema = mongoose.Schema({
  name:String,
  email:String,
  username:String,
  password:String,
  tweets:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:'tweets'
  }
],
tweetMejolikha:[
  {
  type:String,
  ref:'tweets'
}
]
})

userSchema.plugin(plm);

module.exports= mongoose.model('user',userSchema);