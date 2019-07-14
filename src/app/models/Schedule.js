import { isBefore, format } from 'date-fns';
import Sequelize, { Model } from 'sequelize';

class Schedule extends Model {
  static init(sequelize) {
    super.init(
      {
        start: Sequelize.DATE,
        start_formated: {
          type: Sequelize.VIRTUAL,
          get() {
            return format(this.start, 'HH:mm:ss');
          },
        },
        end: Sequelize.DATE,
        end_formated: {
          type: Sequelize.VIRTUAL,
          get() {
            return format(this.end, 'HH:mm:ss');
          },
        },
        classLimit: Sequelize.INTEGER,
        canceled: Sequelize.BOOLEAN,
        canceled_at: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            const dateFormated = format(new Date(), 'HH:mm:ss');
            const startDateFormated = format(this.start, 'HH:mm:ss');
            return isBefore(startDateFormated, dateFormated);
          },
        },
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Schedule;
