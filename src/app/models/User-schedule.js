import Sequelize, { Model } from 'sequelize';

class UserSchedule extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATEONLY,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Schedule, {
      foreignKey: 'schedule_id',
      as: 'schedule',
    });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default UserSchedule;
