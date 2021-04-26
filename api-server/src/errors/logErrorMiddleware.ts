import { HttpError } from 'http-errors';
import { Request, Response, NextFunction } from "express";
import { Logger } from "../helpers";

function logErrorMiddleware(error: HttpError | Error, request: Request, response: Response, next: NextFunction): void {
    if (error instanceof HttpError && error.statusCode)
        Logger.debug(`Error status: ${error.status}\nError message: ${error.message}\nError stack: ${error.stack}`);
    else
        Logger.error(`Error message: ${error.message}\nError stack: ${error.stack}`);


    next(error)
}


export default logErrorMiddleware;