const express = require('express')
const app = express()

app.set("view engine", "ejs");
app.use(express.static('./public'));

app.use(function(req , res , next){
    console.log("middleware working")
    next();
});


app.use(function(req , res , next){
    console.log("middleware working version .2")
    next();
});

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/profile', function (req,res){
    res.send('this is the profile page')
})

app.get('/profile/:username', function (req,res){  //==> route parameters 
    res.send(`this is user profile : ${req.params.username}`);
})

app.get('/contact', function (req, res) {
    res.render('contact')
  })

app.get('/error', function (req, res,next) {
    throw Error("something went wrong this is error warning")
  })


app.use (function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
  })


app.listen(3001)