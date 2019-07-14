import Sequelize, { Model } from 'sequelize';

class Exercise extends Model {
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
    this.belongsTo(models.Unit, { foreignKey: 'unit_id' });
    this.belongsTo(models.File, { foreignKey: 'exercise_animation_id' });
    this.belongsTo(models.ExerciseType, { foreignKey: 'exer_type_id' });
  }
}

export default Exercise;
