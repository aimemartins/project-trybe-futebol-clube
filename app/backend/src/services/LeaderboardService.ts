import { ModelStatic } from 'sequelize';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

import ILeaderboardService from './interfaces/leaderboard-service';

export default class LeaderboardService implements ILeaderboardService {
  _matchesModel: ModelStatic<Matches>;
  _teamModel: ModelStatic<Teams>;
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;

  constructor(modelMatch:ModelStatic<Matches>, modelTeam: ModelStatic<Teams>) {
    this._matchesModel = modelMatch;
    this._teamModel = modelTeam;
    this.name = '';
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
  }

  async getInformations() {
    const result = [
      this.name,
      this.totalPoints,
      this.totalGames,
      this.totalVictories,
      this.totalDraws,
      this.totalLosses,
      this.goalsFavor,
      this.goalsOwn,
    ];
    return result;
  }

//  async getHomeTeams() {
//     const result = await this._matchesModel.findAll({where: {}})
//   }
}
