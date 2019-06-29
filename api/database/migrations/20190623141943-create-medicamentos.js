'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Medicamentos', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      Nome: {
        type: DataTypes.STRING
      },
      Farmaco: {
        type: DataTypes.STRING
      },
      Farmacos: {
        type: DataTypes.STRING
      },
      Concentracao: {
        type: DataTypes.STRING
      },
      Unidade: {
        type: DataTypes.STRING
      },
      TipoMedicamento: {
        type: DataTypes.STRING
      },
      FormaFarmaceutica: {
        type: DataTypes.STRING
      },
      ViaAdministracao: {
        type: DataTypes.STRING
      },
      CodigoATC: {
        type: DataTypes.STRING
      },
      UsoInterno: {
        type: DataTypes.BOOLEAN
      },
      Antimicrobiano: {
        type: DataTypes.BOOLEAN
      },
      Bula: {
        type: DataTypes.STRING
      },
      Portaria344: {
        type: DataTypes.STRING
      },
      ControleEspecial: {
        type: DataTypes.BOOLEAN
      },
      TISS: {
        type: DataTypes.STRING
      },
      MIP: {
        type: DataTypes.STRING
      },
      Label: {
        type: DataTypes.STRING
      },
      Unificado: {
        type: DataTypes.STRING
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
    return queryInterface.dropTable('Medicamentos');
  }
};
