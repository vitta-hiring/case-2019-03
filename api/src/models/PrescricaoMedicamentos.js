module.exports = (sequelize, DataTypes) => {
    const PrescricaoMedicamentos = sequelize.define('Prescricoes_Medicamentos', {
      Prescricao_Id: DataTypes.INTEGER,
      Medicamento_Id: DataTypes.INTEGER
    }, {});
    return PrescricaoMedicamentos;
  };