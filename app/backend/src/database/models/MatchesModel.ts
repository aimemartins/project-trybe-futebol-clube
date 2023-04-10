import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './TeamsModel';

class Matches extends Model {
  // declare <campo>: <tipo>;
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  // ... Campos
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  homeTeamId: {
    type: INTEGER,
    field: 'home_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },

  homeTeamGoals: {
    type: INTEGER,
    field: 'home_team_goals',
  },

  awayTeamId: {
    type: INTEGER,
    field: 'away_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },

  awayTeamGoals: {
    type: INTEGER,
    field: 'away_team_goals',
  },

  inProgress: {
    type: BOOLEAN,
    field: 'in_progress',
  },

}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

// DÚVIDA
// pq a foreinKey é 'homeTeamId' e não 'home_team_id'?
Teams.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Teams.hasMany(Matches, { foreignKey: 'awayTeamId', as: 'awayTeam' });
Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Matches;
