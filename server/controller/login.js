const router = require('express').Router();
const User = require('../models/user');
const {createToken}=require('../services/userAuthentication')
router.route('/')
.post(async(req,res)=>{
    const {email,password}=req.body
    //console.log(email,password)
    try {
        let user=await User.findOne({email,password})
        if(user){
            const token=createToken(user)
            return res.status(200).json({token,username:user.username,_id:user._id})
        }
        else{
            res.status(404).json({msg:"User doesn't Exist"})
        }
    } catch (error) {
        throw new Error('error logging in',error)
    }
})

module.exports=router