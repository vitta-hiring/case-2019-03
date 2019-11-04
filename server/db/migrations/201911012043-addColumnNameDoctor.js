module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'doctor',
      'name',
      {
        type: Sequelize.STRING
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'doctor',
      'name'
    )
  }
}
