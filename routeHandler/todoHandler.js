const express = require('express');
const mongoose= require('mongoose');
const checkLogin = require('../middlewares/LoginCheck');
const router=express.Router();
const todoSchema=require('../schemas/todoSchema');

//model    
const Todo=new mongoose.model("Todo",todoSchema);

// instance method
router.get('/active',async(req,res)=>{
    const todo=new Todo();
    try{
        const data= await todo.findActiveData();
          res.status(200).json({
              data:data,
              message:"showing"
          })
      }
      catch(err){
          res.status(500).json({
              error:'There was a server side error!'
          })
  
      }
   
  
});



router.get('/active-callback',(req,res)=>{
    const todo=new Todo();
   todo.findActiveDataCB((err,data)=>{
      res.status(200).json({
        data
      })
    });
   
  
});



// statics
router.get('/js',async(req,res)=>{
 
 const data=await Todo.findByJs();
 res.status(200).json({
    data
 })
   
  
});


// queryhelper 
router.get('/name',async(req,res)=>{
 
    const data=await Todo.find().findByJs('amir');
    res.status(200).json({
       data
    })
      
     
   });
   

//get all the todos
router.get('/',checkLogin,(req,res)=>{
   
 Todo.find({}).populate("user"," name username -_id").select({
    _id:0,
    date:0
}).exec((err,data)=>{
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
    try{
      const data=  await Todo.find({"_id":req.params.id});
        res.status(200).json({
            data:data,
            message:"showing"
        })
    }
    catch(err){
        res.status(500).json({
            error:'There was a server side error!'
        })

    }
  

});

//post todo
router.post('/',checkLogin,async(req,res)=>{
    const newTodo=new Todo({
        ...req.body,
        user: req.userId
    });

    try{
        await newTodo.save();
        res.status(200).json({
            
            message:"data saved successfully"
        })
    }
    catch(err){
        res.status(500).json({
            
            message:"Server side error!"
        })
    }

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



