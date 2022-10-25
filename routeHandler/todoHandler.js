const express = require('express');
const mongoose= require('mongoose');
const router=express.Router();
const todoSchema=require('../schemas/todoSchema');

//model    
const Todo=new mongoose.model("Todo",todoSchema);



//get all the todos
router.get('/',async(req,res)=>{
await Todo.find({}).select({
    _id:0,
    date:0
}).limit(2).exec((err,data)=>{
      if(err){
        res.status(500).json({
            error:'There was a server side error!'
        })
    } 
    else{
                res.status(200).json({
                    data:data,
                    message:"Todo was show successfully!"
                })
            }
     
})

    
// Todo.find({},(err,data)=>{
//     if(err){
//         res.status(500).json({
//             error:'There was a server side error!'
//         })
//     }
//     else{
//         res.status(200).json({
//             data:data,
//             message:"Todo was inserted successfully!"
//         })
//     }
// })
});
//  get a todo by id 
router.get('/:id',async(req,res)=>{
await Todo.find({"_id":req.params.id},(err,data)=>{
    if(err){
        res.status(500).json({
            error:'There was a server side error!'
        })
    }
    else{
        res.status(200).json({
            data:data,
            message:"showing"
        })
    }
}).clone()
});

//post todo
router.post('/',async(req,res)=>{
    const newTodo=new Todo(req.body);
    await newTodo.save((err)=>{
        if(err){
            res.status(500).json({
                error:'There was a server side error!'
            })
        }
        else{
            res.status(200).json({
                message:"Todo was inserted successfully!"
            })
        }
    });
});

//post may todo
router.post('/all',async(req,res)=>{
    await Todo.insertMany(req.body,(err)=>{
        if(err){
            res.status(500).json({
                error:'There was a server side error!'
            })
        }
        else{
            res.status(200).json({
                message:"Todo were inserted successfully!"
            })
        }
    })
});



//update todo
router.put('/:id',async(req,res)=>{



// await Todo.updateOne({_id:req.params.id},{
//     $set:{
//         status:'active'
//     }
// },(err)=>{
//     if(err){
//         res.status(500).json({
//             error:'There was a server side error!'
//         })
//     }
//     else{
//         res.status(200).json({
//             message:"Todo was updated successfully!"
//         })
//     }
// }).clone()

const result=await Todo.findByIdAndUpdate({_id:req.params.id},{
    $set:{
        status:'inactive'
    }
},
{
    new:true
}
,(err)=>{
    if(err){
        res.status(500).json({
            error:'There was a server side error!'
        })
    }
    else{
        res.status(200).json({
            message:"Todo was updated successfully!"
        })
    }
}).clone()

console.log(result);
});

//delete
router.delete('/:id',async(req,res)=>{
    await Todo.deleteMany({"status":"active"},(err)=>{
        if(err){
            res.status(500).json({
                error:'There was a server side error!'
            })
        }
        else{
            res.status(200).json({
        
                message:"delete multi data"
            })
        }
    }).clone()
});

module.exports=router;



