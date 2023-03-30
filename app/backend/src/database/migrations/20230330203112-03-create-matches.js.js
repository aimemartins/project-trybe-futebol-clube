'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      homeTeamId: Sequelize.INTEGER,

      homeTeamGoals: Sequelize.INTEGER,

      awayTeamId: Sequelize.INTEGER,

      awayTeamGoals: Sequelize.INTEGER,

      inProgress: Sequelize.BOOLEAN,

    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
