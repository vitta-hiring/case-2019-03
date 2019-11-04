module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('doctor', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
    await queryInterface.createTable('pacient', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      filliate: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    })
    await queryInterface.createTable('recipe', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      doctor: {
        type: Sequelize.BIGINT,
        model: 'doctor',
        key: 'id',
        allowNull: false
      },
      pacient: {
        type: Sequelize.BIGINT,
        model: 'pacient',
        key: 'id',
        allowNull: false
      },
      recipesMedications: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    })
  },
  down: async queryInterface => {
    await queryInterface.dropTable('doctor')
    await queryInterface.dropTable('pacient')
    await queryInterface.dropTable('recipe')
  }
}
