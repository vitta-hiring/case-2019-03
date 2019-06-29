'use strict';
module.exports = (sequelize, DataTypes) => {
  const Medicamento = sequelize.define('Medicamento', {
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
  return Medicamento;
};