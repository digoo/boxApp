import Sequelize, { Model } from 'sequelize';

class ExerciseSchedule extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATEONLY,
        duration: Sequelize.INTEGER,
        start_seq: Sequelize.INTEGER,
        end_seq: Sequelize.INTEGER,
        multiplier_seq: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Session, { foreignKey: 'session_id' });
    this.belongsTo(models.SessionCategory, {
      foreignKey: 'session_category_id',
    });
    this.belongsTo(models.Exercise, { foreignKey: 'exercise_id' });
    this.belongsTo(models.Schedule, { foreignKey: 'schedule_id' });
  }
}

export default ExerciseSchedule;
