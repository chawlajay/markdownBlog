const express = require("express");
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles');
const Article = require('./models/article');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost/blog' , {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},()=>{
    new Promise((resolve, reject) => {
        reject('error');
      }).catch((error) => {});
});          // blog is name of our database

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : false}))   // we can access different parameters from our article form inside our articles route using req.body
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));  // to use static css files

app.get('/', async (req,res)=>{
    const articles = await Article.find().sort({ 
        createdAt: 'desc'});               // https://mongoosejs.com/docs/queries.html
    // rendering files for view engine are stored in views folder
    res.render('articles/index', {articles : articles});  // file path for rendering by view engine of EJS
});

app.use('/articles',articleRouter);            // route for user/client

app.listen(5000, ()=>{
console.log("server running at 5000");
});