const jwt=require('jsonwebtoken')
const PRIVATEKEY=process.env.PRIVATEKEY || 'hello'

const createToken=(user)=>{
    try {
        //console.log(user)
        const token=jwt.sign({
            username:user.username,
            email:user.email,
            _id:user._id
            },
            PRIVATEKEY)
            console.log(token)
        return token
    } catch (error) {
        return (error)
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