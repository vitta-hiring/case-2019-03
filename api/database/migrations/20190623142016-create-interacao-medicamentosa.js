'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Interacao_Medicamentosas', {
      idInteracao: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      Farmaco1: {
        type: DataTypes.STRING
      },
      Farmaco2: {
        type: DataTypes.STRING
      },
      Nome: {
        type: DataTypes.STRING
      },
      Descricao: {
        type: DataTypes.STRING(1000)
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },

  down: (queryInterface, DataTypes) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
