import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        email: Sequelize.STRING,
        name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        nickname: Sequelize.STRING,
        address: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        birth: Sequelize.DATEONLY,
        user_level_id: Sequelize.INTEGER,
        provider_id: Sequelize.INTEGER,
        tuition: Sequelize.DATEONLY,
        plan_id: Sequelize.INTEGER,
        contact: Sequelize.STRING,
        checkin_left: Sequelize.INTEGER,
        last_sync: Sequelize.DATEONLY,
        avatar_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
    this.belongsTo(models.User, {
      foreignKey: 'provider_id',
      as: 'provider',
    });
    this.belongsTo(models.UserLevel, {
      foreignKey: 'user_level_id',
      as: 'userLevel',
    });
    this.hasMany(models.UserSchedule);
    this.hasMany(models.Schedule);
    this.hasMany(models.Plan);
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
