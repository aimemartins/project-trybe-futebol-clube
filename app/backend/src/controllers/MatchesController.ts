import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/MatchesService';
import IMatchesController from './interfaces/matches-controller';
import TeamsService from '../services/TeamsService';
// import TeamsModel from '../database/models/TeamsModel';

export default class MatchesController implements IMatchesController {
  _matchesService: MatchesService;
  _teamsService: TeamsService;

  constructor(matchesService: MatchesService, teamsService: TeamsService) {
    this._matchesService = matchesService;
    this._teamsService = teamsService;
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise <Response | void> => {
    try {
      const { inProgress } = req.query;
      // console.log(inProgress);
      if (inProgress === 'true') {
        const matchesInProgress = await this._matchesService.getProgress(true);
        return res.status(200).json(matchesInProgress);
      }

      if (inProgress === 'false') {
        const matchesInProgress = await this._matchesService.getProgress(false);
        return res.status(200).json(matchesInProgress);
      }

      const matches = await this._matchesService.getAll();
      // console.log('CONTROLLER', matches);
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  };

  finishProgress = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise <Response | void> => {
    try {
      const { id } = req.params;
      // const getId = await this._matchesService.getById(Number(id));
      await this._matchesService.finishProgress(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };

  updateMatch = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise <Response | void> => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;

      await this._matchesService
        .updateMatch(Number(homeTeamGoals), Number(awayTeamGoals), Number(id));
      return res.status(200).json({ message: 'The match has been updated' });
    } catch (error) {
      next(error);
    }
  };

  existTeam = async (homeId: number, awayId: number): Promise<boolean> => {
    const array = [homeId, awayId];
    console.log('ARRAYS QUE VEM DA REQ', array);
    const id1 = await this._teamsService.getById(homeId);
    const id2 = await this._teamsService.getById(awayId);
    const existId = [id1, id2];
    const result = await existId.every((id) => id);
    console.log('RESULT', result);
    return result;
  };

  createMatch = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise <Response | void> => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    if (!(await this.existTeam(homeTeamId, awayTeamId))) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    try {
      const result = await this._matchesService
        .createMatch(homeTeamId, awayTeamId, Number(homeTeamGoals), Number(awayTeamGoals));
      return res.status(201).json(result);
    } catch (error) { next(error); }
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
