import {NextFunction,Request,Response} from 'express'
import {AppError} from '../error/AppError'

export function errorHandler(err : Error,req : Request,res : Response,next : NextFunction) : void {
    if(err instanceof AppError){
        console.error(err);
        res.status(err.statusCode).json({message : err.message})
        return;
    }
    console.error(err);
    res.status(500).json({message: err.message || "Internal Server Error"});
}