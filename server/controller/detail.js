const router = require('express').Router();
const User = require('../models/user');
const Post=require('../models/post')
const {getUser}=require('../services/userAuthentication')
const fs=require('fs')
const path=require('path')
router.route('/')
.post(async(req,res)=>{
    const {token}=req.body
   
    const user=getUser(token)
    const posts=await Post.find({author:user._id})
    console.log('posts\n',posts)
    const blogs=posts.map(({_id,title,createdAt})=>{
        return ({_id,title,createdAt,author:user.username})
    })
    res.status(200).json({blogs})
    // try {
    //     const posts=await Post.findById(user._id).sort({createdAt:-1});
    //     const blogs=await Promise.all(posts.map(async({author,_id,createdAt,title})=>{
    //         return (
    //             {author:user.username,_id,createdAt,title}
    //         )
    //     }))
    //     console.log(blogs)
    //     res.status(200).json({blogs})
    // } catch (error) {
    //     console.error(error)
    // }
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