import { Request, Response } from "express";

class WriteupController {
  async all(req: Request, res: Response) {
    const filter = req.query.filter
    const limit = req.query.limit

    return res.json({
      filter,
      limit
    });
  }
}

const writeupController = new WriteupController();
export default writeupController;