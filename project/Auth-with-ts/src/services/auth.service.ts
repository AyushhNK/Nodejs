import { verify } from "jsonwebtoken";
import UserModel from "../models/user.models";
import VerificationCodeModel from "../models/verificationCode.models";
import verificationCodeType from "../constants/verificationCodeType";
import {oneYearFromNow,thirtyDaysFromNow} from "../utils/date";
import SessionModel from "../models/session.models";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_REFRESH_SECRET } from "../constants/env";
import appAssert from "../utils/appAssert";
import { CONFLICT } from "../utils/http";

export type CreateAccountParams={
    email:string;
    password:string;
    userAgent?:string;
};

export const createAccount=async(data: CreateAccountParams)=>{
    const existingUser=await UserModel.exists({email:data.email});
    
    appAssert(!existingUser, CONFLICT, "Email already in use");

    const user=new UserModel({
        email:data.email,
        password:data.password,
    });

    const verificationCode=await VerificationCodeModel.create({
        userId:user._id,
        type:verificationCodeType.EmailVerification,
        expiresAt:oneYearFromNow(),
    });

    const session=await SessionModel.create({
        userId:user._id,
        userAgent:data.userAgent
        
    });

    const refreshToken=jwt.sign(
        {
            sessionId:session._id,
        },
        JWT_REFRESH_SECRET,
        {
            audience:["user"],
            expiresIn:"30d",
        }
    );

    const accessToken=jwt.sign(
        {
            userId:user._id,
            sessionId:session._id,
        },
        JWT_SECRET,
        {
            audience:["user"],
            expiresIn:"15m",
        }

    );

    return {
        user,
        accessToken,
        refreshToken,
    };

}
