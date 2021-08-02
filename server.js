const express = require("express");
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles')
const app = express();

mongoose.connect('mongodb://localhost/blog' , {useNewUrlParser: true, useUnifiedTopology: true},()=>{
    new Promise((resolve, reject) => {
        reject('error');
      }).catch((error) => {});
});          // blog is name of our database

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/articles',articleRouter);            // route for user/client

app.get('/',(req,res)=>{
    const articles = [{
        title : 'some article',
        createdAt : new Date(),
        description : 'some description'
    },
    {
        title : 'some article',
        createdAt : new Date(),
        description : 'some description'
    }];
    res.render('articles/index', {articles : articles});  // file path for rendering by view engine of EJS
});

app.listen(5000, ()=>{
console.log("server running at 5000");
});