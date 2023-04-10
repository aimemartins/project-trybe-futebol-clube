import { ModelStatic } from 'sequelize';
import Matches from '../database/models/MatchesModel';
import IMatchesService from './interfaces/matches-service';

export default class MatchesService implements IMatchesService {
  _matchesModel: ModelStatic<Matches>;

  constructor(model:ModelStatic<Matches>) {
    this._matchesModel = model;
  }

  async getAll():Promise<Matches[]> {
    const result = await this._matchesModel.findAll();
    console.log('SERVICE', result);
    return result;
  }
}
