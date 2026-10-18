import {NextFunction,Request,Response} from 'express'
import {AppError} from './AppError.js'
import { HTTP_STATUS } from "../constants/httpStatus.js";

export function errorHandler(err : Error,req : Request,res : Response,next : NextFunction) : void {
    if(err instanceof AppError){
        console.error(err);
        res.status(err.statusCode).json({message : err.message})
        return;
    }
    console.error(err);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: err.message || "Internal Server Error"});
}