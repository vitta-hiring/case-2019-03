module.exports = (sequelize, DataTypes) =>
  sequelize.define('Pacient', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    filliate: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'pacient',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true
  }
  )
