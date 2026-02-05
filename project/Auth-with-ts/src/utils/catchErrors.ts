import { NextFunction,Request,Response } from "express";
import { ca } from "zod/v4/locales";

type AsycnController= (req:Request,res:Response,next:NextFunction)=>Promise<any>;

const catchErrors=(controller:AsycnController)=>async(req:Request,res:Response,next:NextFunction)=>{
    try{
        await controller(req,res,next);
    }catch(error){
        next(error);
    }
};

export default catchErrors;