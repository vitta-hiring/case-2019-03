module.exports = (sequelize, DataTypes) =>
  sequelize.define('Doctor', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'doctor',
    timestamps: false
  }
  )
