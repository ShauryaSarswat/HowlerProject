const fs = require('fs');
const mugModel = require('../models/pawModel');
const fsPromises = require('fs/promises');
const { error } = require('console');
const { options } = require('../app');
const { query } = require('express');
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
module.exports.addNewMug = async(req,res)=>{
    try{
        const addedMug = await mugModel.create(req.body);
        res.send({
            "status":201,
            "body":{
                "mug": addedMug
            }
        })
    }
    catch(err)
    {
        console.log(err);
        res.status(422);
        res.send({
            "status": 422,
            "message": err.message
        })
    }
    
}

module.exports.getallmugs = async(req,res)=>{
    try
    {
        const queryParams = req.query;
        const {sort,fields,page,limit,...filters} = queryParams;
        console.log(sort+" "+fields+" "+page+" "+limit+" "+filters);
        let allMugs = await mugModel.find(filters);
        if(sort)
        {
            const sortingParams = sort.split(",").join(" ");
            allMugs.sort(sortingParams);
        }
        if(fields)
        {
            const fieldParams = fields.split(",").join(" ");
            allMugs.select(fieldParams);
        }
        const docstoskip = (page-1)*limit;
        allMugs = allMugs.skip(docstoskip)
        res.status(200);
        res.json({
            "status": 200,
            "body":{
                "mugs": allMugs
            }
        })
    }
    catch(err)
    {
        console.log(err);
        res.status(500);
        res.json({
            "status": 500,
            "message": "Internal Server Error"
        })
    }
}


// id based functions

module.exports.getmug = async(req,res)=>{
    try
    {
        const {id:mugID} = req.params;
        const mug = await mugModel.findById(mugID);
        if(mug)
        {
            res.status(200);
            res.send({
                "status": 200,
                "body":{
                    "mug": mug
                }
            })
        }
        else
        {
            throw new Error("Mug not found");
        }
    }
    catch(err)
    {
        res.status(404);
        res.send({
            "status": 404,
            "message": "Paw mug not found"
        })
    }
    
}

module.exports.deleteMug = async(req,res)=>{
    try
    {
        const {id:mugID} = req.params;
        const deletedMug = await mugModel.findOneAndDelete({
            "_id":mugID
        });
        res.status(200);
        res.json({
            "status": 200,
            "body":{
                "mugs": deletedMug
            }
        })
    }
    catch(err)
    {
        res.status(400)
        res.json({
            "status": 400,
            "message": "Bad Request"
        })
    }
}

module.exports.update = async(req,res)=>{
    try
    {
        const {id:mugID} = req.params;
        const {_id,__v,...body} = req.body;
        const updatedMug = await mugModel.findByIdAndUpdate({
            "_id":mugID
        },body,{
            new: true
          });

        res.status(201);
        res.send({
            "status": 201,
            "body": {
                "mug": updatedMug
            }
        })
    }
    catch(err)
    {
        res.status(404);
        res.send({
            "status": 404,
            "message": "Bad Request"
        })
    }
}