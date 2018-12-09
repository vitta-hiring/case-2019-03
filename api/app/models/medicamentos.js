'use strict';
module.exports = (sequelize, DataTypes) => {
  const Medicamentos = sequelize.define('Medicamentos', {
    Nome: DataTypes.STRING,
    Farmaco: DataTypes.STRING,
    Farmacos: DataTypes.STRING,
    Concentracao: DataTypes.STRING,
    Unidade: DataTypes.STRING,
    TipoMedicamento: DataTypes.STRING,
    FormaFarmaceutica: DataTypes.STRING,
    ViaAdministracao: DataTypes.STRING,
    CodigoATC: DataTypes.STRING,
    UsoInterno: DataTypes.BOOLEAN,
    Antimicrobiano: DataTypes.BOOLEAN,
    Bula: DataTypes.STRING,
    Portaria344: DataTypes.STRING,
    ControleEspecial: DataTypes.BOOLEAN,
    TISS: DataTypes.STRING,
    MIP: DataTypes.STRING,
    Label: DataTypes.STRING,
    Unificado: DataTypes.STRING
  }, {});
  Medicamentos.associate = function(models) {
    // associations can be defined here
  };
  return Medicamentos;
};