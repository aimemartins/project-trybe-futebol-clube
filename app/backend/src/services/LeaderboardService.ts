import { ModelStatic } from 'sequelize';
import { LeaderboardInterface } from '../database/models/interfaces/learderboard-model';
import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import LeaderboardModel from '../database/models/LeaderboardModel';
import orderVerify from '../middlewares/verifyOrder';

// código dos requisitos 23 em diante elaborado com a ajuda de Sérgio Moreira

export default class LeaderboardService {
  constructor(private team: ModelStatic<Teams>, private match: ModelStatic<Matches>) { // O construtor da classe recebe dois parâmetros: team e match, que são do tipo ModelStatic
    this.team = team;
    this.match = match;
  }

  async getHomeMatches():Promise<LeaderboardInterface[]> {
    const teams = await this.team.findAll();
    const matches = await this.match.findAll();
    const order = teams.map((el) => new LeaderboardModel(el, matches, 'homeTeamId'));
    const ruleOne = orderVerify(order, 'goalsFavor'); // Chama a função Order com os parâmetros putAtOrder e 'goalsFavor' e armazena o resultado em ruleOne
    const ruleTwo = orderVerify(ruleOne, 'goalsBalance'); // Chama a função orderVerify com os parâmetros ruleOne e 'goalsBalance' e armazena o resultado em ruleTwo
    const ruleThree = orderVerify(ruleTwo, 'totalVictories'); // Chama a função orderVerify com os parâmetros ruleTwo e 'totalVictories' e armazena o resultado em ruleThree
    const ruleFour = orderVerify(ruleThree, 'totalPoints'); // Chama a função Order com os parâmetros ruleThree e 'totalPoints' e retorna o resultado

    return ruleFour;
  }

  async getAwayMatches():Promise<LeaderboardInterface[]> {
    const teams = await this.team.findAll();
    const matches = await this.match.findAll();
    const order = teams.map((el) => new LeaderboardModel(el, matches, 'awayTeamId'));

    return order;
  }
}
