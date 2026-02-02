// SDK initialization

import ImageKit from 'imagekit'
import dotenv from 'dotenv'
dotenv.config();

var imagekit = new ImageKit({
    publicKey : process.env.PUBLIC_KEY,
    privateKey : process.env.PRIVATE_KEY,
    urlEndpoint :"https://ik.imagekit.io/kdp17ftn9"
});

async function UploadFile(buffer){
    const result=await imagekit.upload({
        file:buffer,
        fileName:"image.jpg"
    })
    return result;
}

export default UploadFile;