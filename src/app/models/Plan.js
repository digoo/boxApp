import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        checkin_quantity_week: Sequelize.INTEGER,
        price: Sequelize.DOUBLE,
        month: Sequelize.INTEGER,
        isVisible: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'provider_id' });
  }
}

export default Plan;
