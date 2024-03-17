const fs = require('fs');
const fsPromises = require('fs/promises');
const mugs = JSON.parse(fs.readFileSync('./Data/data.json'));

// checking functions 
module.exports.checkMugID = (req,res,next,val) =>{
    const mugIndex = mugs.findIndex(({id})=>id==val);
    if(mugIndex==-1)
    {
        res.status(404);
        return res.send({
            "status": 404,
            "message": "Mug Not Found"
        })
    }
    next();
}

module.exports.checkMugBody = (req,res,next) =>{
    const data = req.body;
    if(!data.title || !data.price || !data.thumbnail || !data.description)
    {
        res.status(400);
        return res.send({
            "status": 400,
            "messsage": "Required details : [Mug Title, Mug Price, Mug Thumbnail, Mug Description]"
        })
    }
    next();
}

// non-id functions
module.exports.addNewMug = (req,res)=>{
    const {id:reqId, ...data} = req.body;
    const id = mugs[mugs.length-1].id+1;
    const newMug = {id:id,...data};
    fsPromises.writeFile('./Data/data.json',JSON.stringify([...mugs,newMug]));
    res.status(201);
    res.send({
        "status": 201,
        "body":{
            "mug": newMug
        }
    })
}

module.exports.getallmugs = (req,res)=>{
    res.status(200);
    res.json({
        "status": 200,
        "body": {
            "mugs": mugs
        }
    })
}


// id based functions

module.exports.getmug = (req,res)=>{
    const {id:mugID} = req.params;
    const mugIndex = mugs.findIndex(({id})=>id==mugID);
    const mug = mugs[mugIndex];
    res.status(200);
    res.send({
        "status": 200,
        "body":{
            "mug": mug
        }
    })
}

module.exports.deleteMug = (req,res)=>{
    const {id:mugID} = req.params;
    const mugIndex = mugs.findIndex(({id})=>id==mugID);
    const deletedMug = mugs[mugIndex];
    mugs.splice(mugIndex,1);
    console.log(deletedMug);
    fsPromises.writeFile('./Data/data.json',JSON.stringify(mugs));
    res.status(204);
    res.send({
        "status": 204,
        "body":{
            "mug": deletedMug
        }
    })
}

module.exports.update = (req,res)=>{
    const {id:mugID,...data} = req.body;
    const {id:updateMugID} = req.params;
    const mugIndex = mugs.findIndex(({id})=>id==updateMugID);
    const mug = mugs[mugIndex];
    const updatedMug = { ...data,...mug};
    console.log(updatedMug)
    const mugsVector = mugs.map((mug_datapoint)=>{
        if(mug_datapoint.id==updateMugID)
        {
            return updatedMug;
        }
        else
        {
            return mug_datapoint;
        }
    })
    fsPromises.writeFile('./Data/data.json',JSON.stringify(mugsVector));
    res.status(201);
    res.send({
        "status": 201,
        "body": {
            "mug": updatedMug
        }
    })
}