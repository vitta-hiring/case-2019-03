module.exports = (sequelize, DataTypes) => {
    const Medico = sequelize.define('Medico', {
      nome: DataTypes.STRING,
      crm: DataTypes.STRING
    },{
      timestamps: false
    });
    return Medico;
  }