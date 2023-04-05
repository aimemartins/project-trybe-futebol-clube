import { NextFunction, Request, Response } from 'express';

export default interface ITeamController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void>
}
