'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Pacientes', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
      nome: { allowNull: false,type: DataTypes.STRING },
      prontuario: { allowNull: false, type: DataTypes.STRING }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Pacientes');
  }
};
