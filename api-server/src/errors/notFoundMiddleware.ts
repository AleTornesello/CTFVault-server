import { NotFound } from 'http-errors';
import { Request, Response, NextFunction } from "express";

function notFoundMiddleware(request: Request, response: Response, next: NextFunction): void {
    next(new NotFound());
}


export default notFoundMiddleware;