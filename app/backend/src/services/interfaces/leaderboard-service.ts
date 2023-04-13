export default interface ILeaderboardService {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number
}

export interface ILeaderboardServiceHome extends ILeaderboardService {
  goalsBalance: number,
  efficiency: number
}

export interface IMatchesLeader {
  id?: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress?: boolean,
}

export interface ITeamLeader {
  id: number;
  teamName: string;
}
