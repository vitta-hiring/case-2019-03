'use strict';

module.exports = {
  up: function (queryInterface, Sequelize)  {
    return queryInterface.bulkInsert('Pacientes', [{
      nome : 'Edna Rezende',
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize)  {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
