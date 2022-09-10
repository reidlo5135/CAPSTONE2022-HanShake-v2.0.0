import express, {Request, Response} from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from "body-parser";
import DietRouter from '../api/routes/diet/DietRouter';

export default async ({app}:{app:express.Application}) => {
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/v2/api/diet/', DietRouter);
    app.use(function(err:any, req:Request, res:Response) {
        res.status(err.status || 500);
        res.json({message:err.message});
    });

    return app;
}