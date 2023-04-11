import { NextFunction, Request, Response } from 'express';

export default interface IMatchesController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  finishProgress(req: Request, res: Response, next: NextFunction): Promise<Response | void>
  updateMatch(req: Request, res: Response, next: NextFunction): Promise<Response | void>
}
