import { Request, Response } from "express";

import { HTTP_STATUS_CODE } from "../helpers";
import { CtfModel } from "../db/models";
// const ApplicationError = require('../helpers/applicationError');

class CtfController {

  async all(req: Request, res: Response) {
    try {
      CtfModel.find({}).select({ name: 1 }).exec().then((ctfs) => {
        return res.status(HTTP_STATUS_CODE.OK).json(ctfs);
      }).catch(() => {
        return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ error: 'Ctfs not found' });
      });
    } catch (error) {
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  async get(req: Request, res: Response) {
    try {
      CtfModel.findById(req.params.id).exec().then((ctf) => {
        return res.status(HTTP_STATUS_CODE.OK).json(ctf);
      }).catch(() => {
        return res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ error: 'Ctf not found' });
      });
    } catch (error) {
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error });
    }
  }
}

const ctfController = new CtfController();
export default ctfController;