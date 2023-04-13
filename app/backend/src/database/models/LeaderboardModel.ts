import {
  LeaderboardInterface,
  TeamInterface,
  MatchesInterface } from './interfaces/learderboard-model';

// código dos requisitos 23 em diante elaborado com a ajuda de Sérgio Moreira

export default class LeaderboardModel implements LeaderboardInterface {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  matches: MatchesInterface[];
  team: TeamInterface;
  typeTeam: 'homeTeamId' | 'awayTeamId';
  goalsBalance: number;
  efficiency: number;

  constructor(
    Team: TeamInterface,
    Matches: MatchesInterface[],
    typeTeam: 'homeTeamId' | 'awayTeamId',
  ) {
    this.team = Team; // apagar do retorno
    this.typeTeam = typeTeam; // apagar do retorno
    this.name = Team.teamName;
    this.matches = Matches; // pagar do retorno
    this.totalVictories = this.getTotalVictories();
    this.totalLosses = this.getTotalLosses();
    this.totalDraws = this.getTotalDraws();
    this.totalPoints = this.getTotalPoints();
    this.goalsFavor = this.getGoalsMade();
    this.goalsOwn = this.getGoalsSuffered();
    this.totalGames = this.getTotalGames();
    this.goalsBalance = this.balance();
    this.efficiency = this.winPercentage();
  }

  getTotalVictories():number {
    const victory = this.matches.reduce((total, match) => {
      if (match[this.typeTeam] === this.team.id
        && !match.inProgress
        && match.homeTeamGoals > match.awayTeamGoals) {
        return total + 1;
      }
      return total;
    }, 0);

    return victory;
  }

  getTotalLosses():number {
    const victory = this.matches.reduce((total, match) => {
      if (match[this.typeTeam] === this.team.id
        && !match.inProgress
        && match.homeTeamGoals < match.awayTeamGoals) {
        return total + 1;
      }
      return total;
    }, 0);

    return victory;
  }

  getTotalDraws():number {
    const victory = this.matches.reduce((total, match) => {
      if (match[this.typeTeam] === this.team.id
        && !match.inProgress
        && match.homeTeamGoals === match.awayTeamGoals) {
        return total + 1;
      }
      return total;
    }, 0);

    return victory;
  }

  getTotalPoints():number {
    return this.totalDraws + (this.totalVictories * 3);
  }

  getGoalsMade(): number {
    const victory = this.matches.reduce((total, match) => {
      if (match[this.typeTeam] === this.team.id && !match.inProgress) {
        return total + match.homeTeamGoals;
      }
      return total;
    }, 0);

    return victory;
  }

  getGoalsSuffered(): number {
    const victory = this.matches.reduce((total, match) => {
      if (match[this.typeTeam] === this.team.id && !match.inProgress) {
        return total + match.awayTeamGoals;
      }
      return total;
    }, 0);

    return victory;
  }

  getTotalGames(): number {
    return this.totalDraws + this.totalLosses + this.totalVictories;
  }

  balance(): number {
    return this.goalsFavor - this.goalsOwn;
  }

  winPercentage(): number {
    return Number(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));
  }
}
