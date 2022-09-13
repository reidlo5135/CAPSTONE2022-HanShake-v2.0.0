import {StatusCodes} from "http-status-codes";

const CustomError = require('../lib/CustomError');

class BadRequestError extends CustomError {

    constructor(message: string) {
        super(message);
        this.statuscode = StatusCodes.BAD_REQUEST;
    }
}

export = {
    BadRequestError
}