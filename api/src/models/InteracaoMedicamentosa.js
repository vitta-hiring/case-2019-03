'use strict';
module.exports = (sequelize, DataTypes) => {
  const InteracaoMedicamentosa = sequelize.define('Interacao_Medicamentosa', {
    Farmaco1: DataTypes.STRING,
    Farmaco2: DataTypes.STRING,
    Nome: DataTypes.STRING,
    Descricao: DataTypes.STRING
  }, {});
  return InteracaoMedicamentosa;
};