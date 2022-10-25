const express = require('express');
const mongoose=require('mongoose');
const todoHandler=require('./routeHandler/todoHandler')


const app = express();
app.use(express.json());
mongoose
.connect('mongodb://localhost/todos')
.then(()=>console.log('Mongo connection successful'))
.catch((err)=>console.log(err));

app.use('/todo',todoHandler)




function errorHandler(err, req, res, next){
    if (req.headersSent) {
        return next(err);
    }
    else {
        res.status(500).json({ error: err })
    }
}


app.listen(5000, () => console.log('Server running at port 5000'));
