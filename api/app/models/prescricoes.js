'use strict';

module.exports = (sequelize, DataTypes) => {
  const Prescricoes = sequelize.define('Prescricoes', {
    Nome: DataTypes.STRING,
    Paciente_Id: DataTypes.INTEGER,
    Medico_Id: DataTypes.INTEGER
  }, {});
  Prescricoes.associate = function(models) {
    Prescricoes.hasMany(models.Prescricoes_Medicamentos, {
      foreignKey: 'Prescricao_Id',
      as: 'medicamentos'
    });

    Prescricoes.belongsTo(models.Medico, {
      foreignKey: 'Medico_Id',
      as: 'medico',
    });

    Prescricoes.belongsTo(models.Pacientes, {
      foreignKey: 'Paciente_Id',
      as: 'paciente',
    });

  };
  return Prescricoes;
};