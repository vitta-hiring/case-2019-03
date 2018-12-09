'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prescricoes_Medicamentos = sequelize.define('Prescricoes_Medicamentos', {
    Prescricao_Id: DataTypes.INTEGER,
    Medicamento_Id: DataTypes.INTEGER
  }, {});
  Prescricoes_Medicamentos.associate = function(models) {
    // associations can be defined here
  };
  return Prescricoes_Medicamentos;
};