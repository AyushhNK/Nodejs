import assert from 'node:assert';
import AppError from './appError';
import { HttpStatusCode } from './http';
import AppErrorCode from '../constants/appErrorCode';

type AppAssert = (
    conditon:any,
    httpStatusCode:HttpStatusCode,
    message:string,
    appErrorCode?:AppErrorCode
)=> asserts conditon;

const appAssert:AppAssert = (
    condition: any,
    httpStatusCode,
    message,
    appErrorCode
)=>assert(condition, new AppError(httpStatusCode, message, appErrorCode));

export default appAssert;