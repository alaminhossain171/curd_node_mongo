const express = require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');

const todoHandler=require('./routeHandler/todoHandler');
const userHandler=require('./routeHandler/userHandler');

const app = express();
dotenv.config()
app.use(express.json());
mongoose
.connect('mongodb://localhost/todos')
.then(()=>console.log('Mongo connection successful'))
.catch((err)=>console.log(err));

app.use('/todo',todoHandler);
app.use('/user',userHandler);




function errorHandler(err, req, res, next){
    if (req.headersSent) {
        return next(err);
    }
    else {
        res.status(500).json({ error: err })
    }
}

app.use(errorHandler)
app.listen(5000, () => console.log('Server running at port 5000'));
