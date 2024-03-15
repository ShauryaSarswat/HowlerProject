const express = require("express");
const app = express();
const fs = require("fs");
const fsPromises = require("fs/promises")

const mugs = JSON.parse(fs.readFileSync("./data.json"));
app.use(express.json());
app.get('/product',(req,res)=>{
    res.status(200);
    res.json({
        status: 200,
        body:{
            "mugs":mugs
        }
    });
})

app.post('/product',(req,res)=>{
    const body = req["body"];
    const id = mugs.length+1;
    const newEntry = {
        ...body,
        "id" : id
    }
    fsPromises.writeFile("./data.json",JSON.stringify([...mugs,newEntry]));
    res.status(201);
    res.json({
        status: 201,
        body:{
            "mugs":body
        }
    });
})

app.patch('/product/:id',(req,res)=>{
    const params = req["params"];
    const body = req["body"];
    const pid = params.id;
    const toChange = mugs.find((id)=>{
        return id.id==pid
    });
    const newBody = {...toChange,...body};
    const newMugs = mugs.map((item)=>{
        if(item.id==pid)
        {
            return newBody;
        }
        return item;
    })
    fsPromises.writeFile("./data.json",JSON.stringify(newMugs));
    res.status(201);
    res.json({
        status: 201,
        body:{
            "mugs":newBody
        }
    })
})

app.delete('/product/:id',(req,res)=>{
    const params = req["params"];
    const body = req["body"];
    const pid = params.id;
    const toChange = mugs.find((id)=>{
        return id.id==pid
    });
    const newBody = {...toChange,...body};
    console.log(newBody);
    const newMugs = mugs.map((item)=>{
        if(item.id==pid)
        {
            return null;
        }
        return item;
    }).filter(item=> item!==null);
    fsPromises.writeFile("./data.json",JSON.stringify(newMugs));
    res.status(201);
    res.json({
        status: 201,
        body:{
            "mugs":newBody
        }
    })
})
const port = 3000;
app.listen(port,()=>{
    console.log("Listening at :",port);
});
