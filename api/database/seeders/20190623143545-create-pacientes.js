'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Pacientes', [{
      nome: 'Paciente Um',
      prontuario: 'um1'
    },
    {
      nome: 'Paciente Dois',
      prontuario: 'dois2'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pacientes', null, {});
  }
};
