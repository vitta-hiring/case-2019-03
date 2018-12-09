'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Interacao_Medicamentosas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Farmaco1: {
        type: Sequelize.STRING
      },
      Farmaco2: {
        type: Sequelize.STRING
      },
      Nome: {
        type: Sequelize.STRING
      },
      Descricao: {
        type: Sequelize.STRING(1000)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Interacao_Medicamentosas');
  }
};