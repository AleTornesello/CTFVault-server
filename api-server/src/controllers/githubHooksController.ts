import { Request, Response } from "express";

import { HTTP_STATUS_CODE, Logger } from "../helpers";

class GithubHooksController {
  async push(req: Request, res: Response) {
    return res.status(HTTP_STATUS_CODE.OK).json(req.body);
  }

  async issues(req: Request, res: Response) {
    return res.status(HTTP_STATUS_CODE.OK).json(req.body);
  }
}

const githubHooksController = new GithubHooksController();
export default githubHooksController;