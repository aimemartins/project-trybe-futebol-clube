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
