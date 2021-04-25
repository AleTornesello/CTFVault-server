import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

import { HTTP_STATUS_CODE } from "../helpers";

function notFoundMiddleware(request: Request, response: Response, next: NextFunction): void {
    next(createHttpError(HTTP_STATUS_CODE.NOT_FOUND));
}


export default notFoundMiddleware;