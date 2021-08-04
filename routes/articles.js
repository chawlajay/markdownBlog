const express = require('express');
const Article = require('./../models/article');
const router = express.Router();

router.get('/new',(req,res)=>{              // route request by user/client  - here it is /articles/new
res.render('articles/new',{article : new Article()});              // for view engine file
});

router.get('/:id', async (req,res)=>{
    const article = await Article.findById(req.params.id);
    if(article == null) res.redirect('/');
    res.render('articles/show', {article : article});
});

router.post('/', async (req,res)=>{
let article = new Article({
title: req.body.title,
description: req.body.description,
markdown: req.body.markdown
});

try{
    article = await article.save(); // article ID
    // console.log(article);
    res.redirect(`/articles/${article.id}`);
}
catch (e){
    // console.log(article.id);
    console.log(e);
    res.render('articles/new', {article : article})
}

});

module.exports = router;
