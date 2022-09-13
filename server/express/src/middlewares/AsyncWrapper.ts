import {NextFunction, Request, Response} from "express";

const asyncWrapper = (fn: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res);
        } catch (error) {
            next(error);
        }
    }
}

const promiseWrapper = (fn: any) => {
    return async (resolve: any, reject: any) => {
        try {
            await fn(resolve, reject);
        } catch (error) {
            console.error(error);
        }
    }
}

export = {
    asyncWrapper,
    promiseWrapper
}