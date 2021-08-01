const express = require("express");
const app = express();

app.get('/',(req,res)=>{
    res.send("Hello world");
});

app.listen(5000, ()=>{
console.log("server running at 5000");
});