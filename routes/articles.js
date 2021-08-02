const express = require('express');
const Article = require('./../models/article');
const router = express.Router();

router.get('/new',(req,res)=>{              // route request by user/client
res.render('articles/new');              // for view engine file
});

router.post('/',(req,res)=>{

});

module.exports = router;
