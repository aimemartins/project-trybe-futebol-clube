import { Request, Response, NextFunction } from 'express';
// import ITeamService from '../services/interfaces/ITeamsService';
import TeamService from '../services/TeamsService';

export default class TeamController {
  _teamService: TeamService;

  constructor(userService: TeamService) {
    this._teamService = userService;
  }

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise <void> => {
    try {
      const teams = await this._teamService.getAll();
      res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };
}
