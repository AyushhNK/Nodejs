import mongoose from 'mongoose';

async function connectDB(){
    try{
        await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log('database connected successfully')
    }catch(err){
        console.log('database connection failed',err)
    }   
}

export default connectDB;