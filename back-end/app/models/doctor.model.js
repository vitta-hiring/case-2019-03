module.exports = (sequelize, Sequelize) => {
    const Doctor = sequelize.define("doctors", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
    return Doctor;
  };
  