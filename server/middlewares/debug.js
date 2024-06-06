const router = require('express').Router();
router.route('/').get((req,res,next)=>{
    console.log('image upload is working')
    next()
    
})

module.exports=router