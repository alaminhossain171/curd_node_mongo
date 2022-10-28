const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const userSchema = require('../schemas/userSchema');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
//model    
const User = new mongoose.model("User", userSchema);

router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json({
            message: "Signup was successful!",
        });
    } catch {
        res.status(500).json({
            message: "Signup failed!",
        });
    }



});


router.post('/login', async (req, res) => {
  try{

const user = await User.find({ username: req.body.username });


if(user && user.length>0){
    const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);

if(isValidPassword){
const token = jwt.sign({
        username: user[0].username,
        userId: user[0]._id,
    }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });;

    res.status(200).json({
        'your_token':token,
        'message':'login successfully'
    })


}
else{
    res.status(401).json({
        'error':'auth fail !!!'
    }) 
}

}


  }
  catch{
    res.status(401).json({
        'error':'auth fail !!!'
    })
  }
})



module.exports = router;



