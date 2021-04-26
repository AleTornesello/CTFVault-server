import { Request, Response, NextFunction } from "express";

import { CtfModel } from "../db/models";
import { NotFound } from "http-errors"

class CtfController {

  async all(req: Request, res: Response) {
    CtfModel.find({}).select({ name: 1 }).exec().then((ctfs) => {
      return res.json(ctfs);
    });
  }

  async get(req: Request, res: Response, next: NextFunction) {
    CtfModel.findById(req.params.id).exec().then((ctf) => {
      return res.json(ctf);
    }).catch(() => {
      next(new NotFound('Ctfs not found'));
    });
  }
}

const ctfController = new CtfController();
export default ctfController;