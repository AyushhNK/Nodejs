import UserModel from "../models/user.models";

export type CreateAccountParams={
    email:string;
    password:string;
    userAgent?:string;
};

export const createAccount=async(data: CreateAccountParams)=>{
    const existingUser=await UserModel.exists({email:data.email});
    if(existingUser){
        throw new Error("User with this email already exists");
    }
    const newUser=new UserModel({
        email:data.email,
        password:data.password,
    });

    