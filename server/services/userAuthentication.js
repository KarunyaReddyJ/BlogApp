const jwt=require('jsonwebtoken')
const PRIVATEKEY=process.env.PRIVATEKEY

const createToken=(user)=>{
    if(user){
        const token=jwt.sign({
            username:user.username,
            email:user.email,
            _id:user._id
        },
            PRIVATEKEY)
        console.log(token)
        return token
    }
    else{
        throw new Error('Invalid User')
    }
}

const getUser=(token)=>{
    try {
        const user=jwt.verify(token,PRIVATEKEY)

        return user
    } catch (error) {
        console.log('error',error)
    }
}


module.exports={createToken,getUser}