import { Request, Response, NextFunction } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  _leaderService: LeaderboardService;

  constructor(service: LeaderboardService) {
    this._leaderService = service;
  }

  getHomeMatches = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) : Promise <Response | void> => {
    try {
      const infos = await this._leaderService.getHomeMatches();
      return res.status(200).json(infos);
    } catch (error) {
      next(error);
    }
  };

  getAwayMatches = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) : Promise <Response | void> => {
    try {
      const infos = await this._leaderService.getAwayMatches();
      return res.status(200).json(infos);
    } catch (error) {
      next(error);
    }
  };
}
