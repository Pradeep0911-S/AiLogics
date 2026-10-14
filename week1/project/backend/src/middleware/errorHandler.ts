import {NextFunction,Request,Response} from 'express'

export function errorHandler(err : Error,req : Request,res : Response,next : NextFunction) : void {
    res.status(500).json({message : "Internal server error"})
}