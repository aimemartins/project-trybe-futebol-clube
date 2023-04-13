import { LeaderboardInterface } from '../database/models/interfaces/learderboard-model';

// código dos requisitos 23 em diante elaborado com a ajuda de Sérgio Moreira

export default function orderVerify(
  interf: LeaderboardInterface[],
  orderRules: 'totalVictories' | 'goalsBalance' | 'goalsFavor' | 'totalPoints',
): LeaderboardInterface[] {
  return interf.sort((a, b) => (b[orderRules] - a[orderRules]));
}
