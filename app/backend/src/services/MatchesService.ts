import { ModelStatic } from 'sequelize';
import Matches from '../database/models/MatchesModel';
import IMatchesService from './interfaces/matches-service';
import Teams from '../database/models/TeamsModel';

export default class MatchesService implements IMatchesService {
  _matchesModel: ModelStatic<Matches>;
  _teamModel: ModelStatic<Teams>;

  constructor(modelMatch:ModelStatic<Matches>, modelTeam: ModelStatic<Teams>) {
    this._matchesModel = modelMatch;
    this._teamModel = modelTeam;
  }

  async getAll():Promise<Matches[]> {
    const result = await this._matchesModel.findAll({
      include: [
        {
          model: this._teamModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: this._teamModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
      // attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });
    // console.log('SERVICE', result);
    return result;
  }

  async getProgress(boolean: boolean): Promise<Matches[] | null> {
    const result = await this._matchesModel.findAll({
      where: { inProgress: boolean },
      include: [
        {
          model: this._teamModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: this._teamModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
      // attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });
    // console.log('SERVICE', result);
    return result;
  }

  async getById(id: number): Promise<Matches | null> {
    const result = await this._matchesModel.findByPk(id);
    return result;
  }

  async finishProgress(id: number):Promise <void> {
    await this._matchesModel.update({ inProgress: false }, { where: { id } });
  }
}
