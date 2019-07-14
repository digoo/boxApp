import Sequelize, { Model } from 'sequelize';

class SessionCategory extends Model {
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
    this.belongsTo(models.Unit, { foreignKey: 'unit_id', as: 'unit' });
  }
}

export default SessionCategory;
