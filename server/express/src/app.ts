import express, {Request, Response, NextFunction} from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from "body-parser";

import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app: express.Application = express();
const port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use(function(err:any, req:Request, res:Response, next:NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, async () => {
  console.log(`Express app.ts -> Connected to http://localhost:${port}`);
});

module.exports = app;
