module.exports = (sequelize, DataTypes) => {
  const Prescricao = sequelize.define('Prescricoes', {
    Nome: DataTypes.STRING,
    Paciente_Id: DataTypes.INTEGER,
    Medico_Id: DataTypes.INTEGER
  }, {});
  Prescricao.associate = function (models) {
    Prescricao.hasMany(models.Prescricoes_Medicamentos, {
      foreignKey: 'Prescricao_Id',
      as: 'prescricao'
    });

    Prescricao.belongsTo(models.Medico, {
      foreignKey: 'Medico_Id',
      as: 'medico',
    });

    Prescricao.belongsTo(models.Paciente, {
      foreignKey: 'Paciente_Id',
      as: 'paciente',
    });

  };
  return Prescricao;
};