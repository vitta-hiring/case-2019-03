'use strict';

module.exports = {
  up :  (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Medicos', [{
      nome : 'Ricardo Rezende1',
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down : (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Medicos', [{
      first_name :'Ricardo Rezende'
    }])
  }
};