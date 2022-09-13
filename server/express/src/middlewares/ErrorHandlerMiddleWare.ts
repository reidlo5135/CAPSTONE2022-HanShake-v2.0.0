import {StatusCodes} from "http-status-codes";
import {Request, Response} from "express";

const ErrorHandlerMiddleWare = (err: any, req: Request, res: Response) => {
    let error = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Internal server error",
    }

    return res.status(error.statusCode).json({message: error.message});
}

export = {
    ErrorHandlerMiddleWare
}