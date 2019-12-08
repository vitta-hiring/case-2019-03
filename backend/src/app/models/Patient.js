import Sequelize, { Model } from 'sequelize';

class Patient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        gender: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default Patient;
