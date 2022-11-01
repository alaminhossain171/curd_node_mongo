const mongoose=require('mongoose');


const todoSchema=mongoose.Schema({
title:{
 type:String,
 required:true,   
},
description:String,
status:{
    type:String,
    enum:['active','inactive']
},
date:{
    type:Date,
    default:Date.now
},
user:{
    type:mongoose.Types.ObjectId,
    ref:"User"
}


})

todoSchema.methods={
    findActiveData:()=>{
return mongoose.model('Todo').find({"status":"active"});
    },

    findActiveDataCB:(cb)=>{
        return mongoose.model('Todo').find({"status":"inactive"},cb);
            }
};
todoSchema.statics={
    findByJs:function(){
        return this.find({title:/js/i});
    }
}

todoSchema.query={
    findByJs:function(name){
        return this.find({title:new RegExp(name,"i")});
    }
}

module.exports=todoSchema;