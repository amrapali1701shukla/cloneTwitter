const mongoose = require('mongoose');


const tweetSchema = mongoose.Schema([{
    tweets:String,
   userId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'users'
   },
   time:{
       type:Date,
       Default:Date.now
   },
   likes:[{
       type:mongoose.Schema.Types.ObjectId,
       Default:0
   }]
}])


module.exports= mongoose.model('tweet',tweetSchema);