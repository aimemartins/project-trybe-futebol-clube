import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/MatchesService';
import IMatchesController from './interfaces/matches-controller';

export default class MatchesController implements IMatchesController {
  _matchesService: MatchesService;

  constructor(matchesService: MatchesService) {
    this._matchesService = matchesService;
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise <Response | void> => {
    try {
      const matches = await this._matchesService.getAll();
      console.log('CONTROLLER', matches);
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };
  // Pq dessa forma a função dá erro?

  // async getAll(req: Request, res: Response, next: NextFunction): Promise <Response | void> {
  //   try {
  //     const matches = await this._matchesService.getAll();
  //     console.log('CONTROLLER', matches);
  //     return res.status(200).json(matches);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
