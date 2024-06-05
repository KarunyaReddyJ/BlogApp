const router = require('express').Router();
const User = require('../models/user');
const Post=require('../models/post')
const {getUser}=require('../services/userAuthentication')
router.route('/')
.post(async(req,res)=>{
    const {token}=req.body
    console.log(token)
    const user=getUser(token)
    const blogs=await Post.find({author:user._id})
    return res.status(200).json({blogs})
})

module.exports=router