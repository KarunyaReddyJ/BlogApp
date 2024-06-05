const router = require('express').Router();
const User = require('../models/user');
const {createToken}=require('../services/userAuthentication')
router.route('/')
.post(async(req,res)=>{
    const {username,email,password}=req.body
    try {
        let user=await User.findOne({email})
        if(user)
            return res.status(500).json({msg:"User Already Exists"})
        else{
            user=await User.create({username,email,password})
            if(user){
                const token=createToken(user)
                return res.status(200).json({token})
            }
            else
                res.status(404).json({msg:'Cannot create account'})
        }
    } catch (error) {
        throw new Error('error while registering',error)
    }
})

module.exports=router