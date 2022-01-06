const express = require('express');
const Article = require('./../models/article');
const router = express.Router();

router.get('/new',(req,res)=>{              // route request by user/client  - here it is /articles/new
res.render('articles/new',{article : new Article()});              // for view engine file
});

router.get('/edit/:id',async (req,res)=>{              // route request by user/client  - here it is /articles/new
    const article = await Article.findById(req.params.id);
    
    res.render('articles/edit',{article : article});              // for view engine file
    });
    

router.get('/:slug', async (req,res)=>{
    const article = await Article.findOne({slug: req.params.slug});
    if(article == null) res.redirect('/');
    res.render('articles/show', {article : article});
});

router.post('/', async (req,res,next)=>{
req.article = new Article();
next();
}, saveArticleAndRedirect("new"));

router.put('/:id', async (req,res,next)=>{
    req.article = await Article.findById(req.params.id);
    next();
    }, saveArticleAndRedirect("edit"));    
    
router.delete('/:id', async (req,res)=>{
await Article.findByIdAndDelete(req.params.id);
res.redirect('/');
});

function saveArticleAndRedirect(path){
return async (req,res)=>{
    let article = req.article;
        article.title = req.body.title;
        article.description = req.body.description;
        article.markdown = req.body.markdown;
        
        try{
            article = await article.save(); // article ID
            // console.log(article);
            res.redirect(`/articles/${article.slug}`);
        }
        catch (e){
            // console.log(article.id);
            console.log(e);
            res.render(`articles/${path}`, {article : article})
        }
}
}

module.exports = router;
