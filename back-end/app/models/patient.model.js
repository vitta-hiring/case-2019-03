module.exports = (sequelize, Sequelize) => {
    const Patient = sequelize.define("patients", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
    return Patient;
  };
  