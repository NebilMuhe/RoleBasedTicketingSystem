import type { NextFunction,Request,Response } from "express";
import { BaseError, ValidationError } from "../error/error";


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof ValidationError) {
        res.status(err.statusCode).json({
            status: 'fail',
            message: err.message,
            data: err.errorData
        })
    } else if (err instanceof BaseError) {
        if( err.isOperational) {
            res.status(err.statusCode).json({
                status: err.statusCode < 500 && err.statusCode >= 400 ? 'fail' :'error',
                message: err.message
            })
        } else {
            console.log(err)
            res.status(err.statusCode).json({
                status: 'error',
                message: 'Something went wrong'
            })
        }
    }
}