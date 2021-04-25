import { Request, Response } from "express";

import { HTTP_STATUS_CODE } from "../helpers";

class WriteupController {
  async all(req: Request, res: Response) {
    const filter = req.query.filter
    const limit = req.query.limit

    return res.status(HTTP_STATUS_CODE.OK).json({
      filter,
      limit
    });
  }
}

const writeupController = new WriteupController();
export default writeupController;