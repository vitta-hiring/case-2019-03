module.exports = (sequelize, DataTypes) =>
  sequelize.define('Recipe', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    doctor: {
      type: DataTypes.BIGINT,
      references: 'doctor',
      referencesKey: 'id',
      allowNull: false
    },
    pacient: {
      type: DataTypes.BIGINT,
      references: 'pacient',
      referencesKey: 'id',
      allowNull: false
    },
    recipesMedications: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'recipe',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true
  }
  )
