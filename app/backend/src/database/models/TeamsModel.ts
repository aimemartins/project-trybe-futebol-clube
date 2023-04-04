import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Matches from './MatchesModel';
// import OtherModel from './OtherModel';

class Teams extends Model {
  // declare <campo>: <tipo>;
  declare id:number;
  declare teamName:string;
}

Teams.init({
  // ... Campos
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  teamName: {
    type: STRING(40),
    allowNull: false,

  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

Teams.hasMany(Matches, { foreignKey: 'home_team_id', as: 'homeTeamId' });
Teams.hasMany(Matches, { foreignKey: 'away_team_id', as: 'awayTeamId' });
Matches.belongsTo(Teams, { foreignKey: 'id', as: 'homeTeam' });
Matches.belongsTo(Teams, { foreignKey: 'id', as: 'awayTeam' });
/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Teams;
