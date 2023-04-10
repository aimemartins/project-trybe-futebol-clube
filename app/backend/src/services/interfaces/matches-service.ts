import Matches from '../../database/models/MatchesModel';

export default interface IMatchesService {
  getAll():Promise< Matches[]>
  getProgress(inProgress: boolean): Promise <Matches[] | null>
}
