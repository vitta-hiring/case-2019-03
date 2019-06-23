'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Medicos', [{
      nome: 'Medico Um',
      crm: 'um1'
    },
    {
      nome: 'Medico Dois',
      crm: 'dois2'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pacientes', null, {});
  }
};
