// código dos requisitos 23 em diante elaborado com a ajuda de Sérgio Moreira

export interface TeamInterface {
  id: number,
  teamName: string,
}

export interface MatchesInterface {
  id?: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress?: boolean
}

export interface LeaderboardInterface {
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
  goalsBalance: number;
  efficiency: number;
}
