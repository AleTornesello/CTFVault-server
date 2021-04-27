import { HttpError, InternalServerError } from 'http-errors';
import { Request, Response, NextFunction } from "express";

function errorHandlerMiddleware(error: HttpError | Error, request: Request, response: Response, _next: NextFunction): Response | void {
    const httpError: HttpError = error instanceof HttpError
        ? error
        : new InternalServerError(error.message);

    response.status(httpError.statusCode);
    const errorMessage = httpError.expose ? httpError.message : null;

    return response.json({ error: errorMessage });
}


export default errorHandlerMiddleware;