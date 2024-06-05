const router = require('express').Router();
const {getUser}=require('../services/userAuthentication')


router.route('/').get((req,res,next)=>{
    const {token}=req.body
    const user=getUser(token)
    if(user)
        next()
    else{
        res.status(401).json({msg:"Login First"})
    }
})

module.exports=router