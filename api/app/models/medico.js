module.exports = (sequelize, DataTypes) => {
    const Medico = sequelize.define('Medico', {
      nome: DataTypes.STRING,
    });
  
    return Medico;
  }