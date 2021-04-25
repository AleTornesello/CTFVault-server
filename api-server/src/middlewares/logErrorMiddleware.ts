import { Request, Response, NextFunction } from "express";

import { Logger } from "../helpers";

function logErrorMiddleware(error: any, request: Request, response: Response, next: NextFunction): void {
    if (!error.statusCode) Logger.error(`Error message: ${error.message}\nError stack: ${error.stack}`);
    else Logger.debug(`Error status: ${error.status}\nError message: ${error.message}\nError stack: ${error.stack}`);
    next(error)
}


export default logErrorMiddleware;