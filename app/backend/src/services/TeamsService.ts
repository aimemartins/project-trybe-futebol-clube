import { ModelStatic } from 'sequelize';
import TeamsModel from '../database/models/TeamsModel';

class TeamsService {
  _teamModel: ModelStatic<TeamsModel>;

  constructor(model:ModelStatic<TeamsModel>) {
    this._teamModel = model;
  }

  public async getAll():Promise <TeamsModel[]> {
    const result = await this._teamModel.findAll();
    return result;
  }
}

export default TeamsService;
