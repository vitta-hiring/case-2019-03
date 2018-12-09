'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Medicamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Nome: {
        type: Sequelize.STRING
      },
      Farmaco: {
        type: Sequelize.STRING
      },
      Farmacos: {
        type: Sequelize.STRING
      },
      Concentracao: {
        type: Sequelize.STRING
      },
      Unidade: {
        type: Sequelize.STRING
      },
      TipoMedicamento: {
        type: Sequelize.STRING
      },
      FormaFarmaceutica: {
        type: Sequelize.STRING
      },
      ViaAdministracao: {
        type: Sequelize.STRING
      },
      CodigoATC: {
        type: Sequelize.STRING
      },
      UsoInterno: {
        type: Sequelize.BOOLEAN
      },
      Antimicrobiano: {
        type: Sequelize.BOOLEAN
      },
      Bula: {
        type: Sequelize.STRING
      },
      Portaria344: {
        type: Sequelize.STRING
      },
      ControleEspecial: {
        type: Sequelize.BOOLEAN
      },
      TISS: {
        type: Sequelize.STRING
      },
      MIP: {
        type: Sequelize.STRING
      },
      Label: {
        type: Sequelize.STRING
      },
      Unificado: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Medicamentos');
  }
};