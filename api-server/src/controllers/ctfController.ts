import { Request, Response, NextFunction } from "express";

import { HTTP_STATUS_CODE } from "../helpers";
import { CtfModel } from "../db/models";
import createHttpError from "http-errors"

class CtfController {

  async all(req: Request, res: Response) {
    CtfModel.find({}).select({ name: 1 }).exec().then((ctfs) => {
      return res.status(HTTP_STATUS_CODE.OK).json(ctfs);
    });
  }

  async get(req: Request, res: Response, next: NextFunction) {
    CtfModel.findById(req.params.id).exec().then((ctf) => {
      return res.status(HTTP_STATUS_CODE.OK).json(ctf);
    }).catch(() => {
      next(createHttpError(HTTP_STATUS_CODE.NOT_FOUND, 'Ctfs not found'));
    });
  }
}

const ctfController = new CtfController();
export default ctfController;