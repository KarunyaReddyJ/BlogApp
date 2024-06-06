const router = require('express').Router();
const User = require('../models/user');
const Post=require('../models/post')
const {getUser}=require('../services/userAuthentication')
const fs=require('fs')
const path=require('path')
router.route('/')
.post(async(req,res)=>{
    const {token}=req.body
   // console.log(token)
    const user=getUser(token)
    const blogs=await Post.find({author:user._id})
    return res.status(200).json({blogs})
})
router.route('/getProfileImage')
.post(async(req,res)=>{
    const token=req.headers.authorization.split(' ')[1]
    const user=getUser(token)
    const filePath=path.join(__dirname,'../','uploads',`${user._id}.jpeg`)
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Failed to read image' });
        } else {
            const base64Image = Buffer.from(data).toString('base64');
            res.send(base64Image);
        }
    });
})
module.exports=router