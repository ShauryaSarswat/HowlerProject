const express =  require('express');
const mugController = require('../controllers/mugController');

// creating router
const mugRouter = express.Router();

// defining the routes

mugRouter
    .route('/')
    .get(mugController.getallmugs)
    .post(mugController.checkMugBody,mugController.addNewMug)

mugRouter.param('id',(mugController.checkMugID));

mugRouter
    .route('/:id')
    .patch(mugController.update)
    .get(mugController.getmug)
    .delete(mugController.deleteMug)

module.exports = mugRouter;