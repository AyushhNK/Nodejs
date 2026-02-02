import express from 'express'
import multer from 'multer'
import UploadFile from './services/storage.service.js' 
import Post from './models/post.model.js'
const app=express()

app.use(express.json())	

const upload=multer({storage:multer.memoryStorage()})

app.post('/upload',upload.single('image'),async(req,res)=>{
    try{
        const file=req.file.buffer
        const result=await UploadFile(file)
        const post=await Post.create({
            image:result.url,
            caption:req.body.caption
        })
        res.status(200).json({message:'file saved successfully',data:post})
    }catch(err){
        res.status(500).json({message:'file upload failed',error:err.message})
    }   
})

export default app