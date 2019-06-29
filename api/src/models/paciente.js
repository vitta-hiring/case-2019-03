module.exports = (sequelize, DataTypes) => {
  const Paciente = sequelize.define('Paciente', {
    nome: DataTypes.STRING,
    prontuario: DataTypes.STRING
  },{
    timestamps: false
  });
  return Paciente;
}