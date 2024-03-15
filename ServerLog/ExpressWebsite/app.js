const express = require('express');
const app = express();


app.get('/',(req,res)=>{
    res.send("shaurya sarswat");
})

  
app.listen(3000)