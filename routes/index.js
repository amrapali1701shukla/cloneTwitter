var express = require('express');
var router = express.Router();
const usersModel = require('./users');
const tweetModel = require('./tweet');
const passport = require('passport');
const localStrategy = require('passport-local');
const { findByIdAndUpdate } = require('./users');
// const tweet = require('./tweet');

passport.use(new localStrategy(usersModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup',function(req,res){
  res.render('sign');
});

router.get('/login',function(req,res){
  res.render('login');
});

router.post('/register',function(req,res){
  const newUser = new usersModel({
    username:req.body.username,
    name:req.body.name,
    email:req.body.email
  })
  usersModel.register(newUser,req.body.password)
  .then(function(User){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/profile');
    })
  })
})

router.post('/login',passport.authenticate('local',{
  successRedirect:'/profile',
  failureRedirect: '/'
}), function(req,res){
})

router.get('/profile',isLoggedIn,function(req,res){
  res.render('profile');
})



router.post('/tweet',function(req,res,next){
    usersModel.findOne({username:req.session.passport.user})
     .then(foundUser => {
      tweetModel.create({
         userId: foundUser._id,
         tweets:req.body.tweets
        })
       .then(createdTweet => {
       foundUser.tweets.push(createdTweet._id)
       foundUser.tweetMejolikha.push(createdTweet.tweets)
       foundUser.save()
         .then(savedData => {
         res.redirect('/profilee')
         })
           })
     })
})

router.get('/profilee',isLoggedIn,function(req,res){
    tweetModel.find()
    .then(tweets => {
      res.render('profilee',{tweets:tweets})
    })
})

router.get('/like/:aidee',isLoggedIn,function(req,res){
  usersModel
  .findOne({username:req.session.passport.user})
  .then(function(foundUser){
    tweetModel.
    findOne({_id:req.params.aidee})
    .then(function(foundTweet){
      if(foundTweet.likes.indexOf(foundUser._id) === -1){
        foundTweet.likes.push(foundUser._id);
      }
      else{
        var existingIndex = foundTweet.likes.indexOf(foundUser._id);
        foundTweet.likes.splice(existingIndex,1);
      }
      foundTweet.save()
      .then(function(savedTweet){
       res.redirect('/profilee');
      })
    })
  })
})

router.get('/edit/:aidee',isLoggedIn,function(req,res){
  usersModel
  .findOne({username:req.session.passport.user})
  .then(function(foundUser){
    tweetModel.
    findOne({_id:req.params.aidee})
    .then(function(foundTweet){
      if(foundTweet.userId.equals(foundUser._id)){
       res.render
      }
      else{
        // res.redirect('/retweet');
        res.send('Ye tweet tumhara nahi hai bas comment kar sakte ho')
      }

      //   foundTweet.likes.push(foundUser._id);
      // }
      // else{
      //   var existingIndex = foundTweet.likes.indexOf(foundUser._id);
      //   foundTweet.likes.splice(existingIndex,1);
      // }
      // foundTweet.save()
      // .then(function(savedTweet){
      //  res.redirect('/profilee');
      // })
      res.send(foundTweet);
    })
  })
})

router.get('/edit',isLoggedIn,function(req,res){
  usersModel
  .findOne({username:req.session.passport.user})
  .then(function(foundUser){
    tweetModel.
    findOne({_id:req.params.aidee})
    .then(function(foundTweet){
      res.send(foundTweet);

    })
  })
});

router.post('/edit',isLoggedIn,function(req,res){
  res.send(req.body);
})

router.get('/mil',function(req,res){
  usersModel.find()
  .then(milGya => {
    res.send(milGya);
  })
})

router.get('/txt',function(req,res){
  res.render('txt');
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/');
  }
}

module.exports = router;
