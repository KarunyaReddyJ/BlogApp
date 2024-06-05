const router = require('express').Router();
const Post = require('../models/post');
const {getUser}=require('../services/userAuthentication')
const checkIfLoggedIn=require('../middlewares/checkIfLoggedIn')
router.route('/')
.get(async(req,res)=>{
    try {
        const posts=await Post.find();
        res.status(200).json({posts})
    } catch (error) {
        console.error(error)
    }
})
router.route('/create')
.post(checkIfLoggedIn,async(req,res)=>{
    const {title,content,token}=req.body
    try {
        const user=getUser(token)
        const post=await Post.create({title,content,author:user._id})
        if(post)
           return res.status(200).json({MSG:"Post created"})
        res.status(500).json({msg:"cannot create post"})
    } catch (error) {
        throw new Error(error)
    }
})
router.route('/:postId/like')
.post(checkIfLoggedIn,async(req,res)=>{
    const {token,_id}=req.body
    const user=getUser(token)
    const post=await Post.findOne({_id})
    if(post.likes.includes(user._id))
        post.likes=post.likes.filter(id=>id!==user._id)
    else
        post.likes.push(user._id)
    const updatedPost=await Post.findByIdAndUpdate(_id,{likes:post.likes},{new:true})
    if(updatedPost===undefined)
        return res.status(404).json({msg:"Cannot Update Post"})
    else
        return res.status(200).json({msg:'success'})
})
module.exports=router