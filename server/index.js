require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser=require('body-parser')
const cors=require('cors')
const cookiePraser=require('cookie-parser')
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(cookiePraser())
//controllers
const registerController=require('./controller/register')
const loginController=require('./controller/login')
const postController=require('./controller/post')
const detailsController=require('./controller/detail')
const profileController = require('./controller/profile');

const Post = require('./models/post');
const Comment = require('./models/comment');
const connectDb=require('./db')
const PORT = process.env.PORT || 3000;
app.use('/register',registerController)
app.use('/login',loginController)
app.use('/post',postController)
app.use('/detail',detailsController)
app.post('/upload-profile-image', profileController.uploadProfileImage);

connectDb()
.then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
})