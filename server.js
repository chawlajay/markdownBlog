const express = require("express");
const articleRouter = require('./routes/articles')
const app = express();

app.set('view engine', 'ejs');

app.use('/articles',articleRouter);

app.get('/',(req,res)=>{
    res.render('index', {text : "hellow"});
});

app.listen(5000, ()=>{
console.log("server running at 5000");
});