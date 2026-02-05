import { ErrorRequestHandler,Response} from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../utils/http";
import { z } from "zod";

const handleZodError=(res:Response, err: z.ZodError)=>{
    const errors=err.issues.map((error)=>({
        path: error.path.join('.'),
        message: error.message,
    }));
        
    return res.status(BAD_REQUEST).json({
        message:err.message,
        errors
    });
};

const errorHandler:ErrorRequestHandler=(err,req,res,next)=>{
    console.log(`PATH: ${req.path} - ERROR: ${err.message}`);

    if(err instanceof z.ZodError){
        return handleZodError(res,err);
    }

    return res.status(INTERNAL_SERVER_ERROR).json({message:"Internal Server Error"});
};

export default errorHandler;