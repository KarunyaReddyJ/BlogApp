const mongoose=require('mongoose')
const URI=process.env.URI || 'mongodb://127.0.0.1:27017/blogapp'

const connectDb=async()=>{
    try {
        await mongoose.connect(URI)
    } catch (error) {
        throw new Error(error)
    }
}

module.exports=connectDb