import mongoose from 'mongoose';

const postSchema=new mongoose.Schema({
    image:String,
    caption:String
})

const Post=mongoose.model('Post',postSchema)

export default Post;