import { Request, Response, NextFunction } from "express";
import { Logger } from "../helpers";

// https://github.com/zellwk/zellwk.com/blob/master/src/posts/2019-11-06-express-errors.md
function errorHandlerMiddleware(error: any, request: Request, response: Response, _next: NextFunction): Response | void {
    if (!error.statusCode) error.statusCode = 500;

    return response
        .status(error.statusCode)
        .json({ error: error.message });
}


export default errorHandlerMiddleware;