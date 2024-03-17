const express = require('express')
const morgan = require('morgan');
const app = express()

// importing the routers
const mugRouter = require("./routes/mugRouter");


// adding the middlewares

// JSON parsing 
app.use(express.json());
// SERVER LOG
app.use(morgan('dev'));

// routing
app.use('/product',mugRouter);

module.exports = app;