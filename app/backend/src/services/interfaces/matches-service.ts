import Matches from '../../database/models/MatchesModel';

export default interface IMatchesService {
  getAll():Promise< Matches[]>
}
