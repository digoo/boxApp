import Sequelize, { Model } from 'sequelize';

class UserLevel extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default UserLevel;
