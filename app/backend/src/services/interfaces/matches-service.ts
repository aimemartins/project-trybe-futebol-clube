import Matches from '../../database/models/MatchesModel';

export default interface IMatchesService {
  getAll():Promise< Matches[]>
  getProgress(inProgress: boolean): Promise <Matches[] | null>
  getById(id: number): Promise <Matches | null>
  finishProgress(id:number):Promise <void>
  updateMatch(homeGoals:number, awayGoals: number, id: number): Promise <void>
}
