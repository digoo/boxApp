import Sequelize, { Model } from 'sequelize';

class Unit extends Model {
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

  static associate(models) {
    this.hasMany(models.SessionCategory);
  }
}

export default Unit;
