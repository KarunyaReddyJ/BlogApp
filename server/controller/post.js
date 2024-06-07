const router = require('express').Router();
const Post = require('../models/post');
const User = require('../models/user');
const {getUser}=require('../services/userAuthentication')
const checkIfLoggedIn=require('../middlewares/checkIfLoggedIn')
router.route('/')
.get(async(req,res)=>{
    try {
        const posts=await Post.find().sort({createdAt:-1});
        const blogs=await Promise.all(posts.map(async({author,_id,createdAt,title})=>{
            const user=await User.findById(author)
            return (
                {author:user.username,_id,createdAt,title}
            )
        }))
        console.log(blogs)
        res.status(200).json({blogs})
    } catch (error) {
        console.error(error)
    }
})

router.route('/create')
.post(checkIfLoggedIn,async(req,res)=>{
    const {title,content,token}=req.body
    console.log({title,content,token})
    try {
        const user=getUser(token)
        const post=await Post.create({title,content,author:user._id})
        if(post)
           return res.status(200).json({MSG:"Post created"})
        res.status(500).json({msg:"cannot create post"})
    } catch (error) {
        console.log('error while posting',error)
    }
})
router.route('/:id')
.post(async(req,res)=>{
    const id=req.params.id
    console.log('id',id)
    const post=await Post.findById(id);
    try {
        console.log('pts',post)
       res.status(200).json({post})
    } catch (error) {
        console.error(error)
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