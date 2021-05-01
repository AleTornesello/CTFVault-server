import { Request, Response, NextFunction } from "express";
import { injectable } from "tsyringe";
import { NotFound } from "http-errors"

import { controller, action } from "../tsyringe-express";
import { CtfModel } from "../db/models";

@controller({ route: `/api/${process.env.API_VERSION}/ctfs` })
@injectable()
class CtfController {

  @action({ route: '/' })
  async all(req: Request, res: Response): Promise<void> {
    CtfModel.find({}).select({ name: 1 }).exec().then((ctfs) => {
      return res.json(ctfs);
    });
  }

  @action({ route: '/:id' })
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    CtfModel.findById(req.params.id).exec().then((ctf) => {
      return res.json(ctf);
    }).catch(() => {
      next(new NotFound('Ctfs not found'));
    });
  }
}

export { CtfController };