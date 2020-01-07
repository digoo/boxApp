import { parse } from 'date-fns';
import { Op } from 'sequelize';

import User from '../models/User';
import Schedule from '../models/Schedule';

class ScheduleController {
  async index(req, res) {
    const checkRegularUser = await User.findOne({
      where: { id: req.userId, user_level_id: [3, 5] },
    });
    if (!checkRegularUser) {
      return res
        .status(400)
        .json({ error: 'You are not able to create schedules!' });
    }

    const schedule = await Schedule.findAll({
      attributes: [
        'date',
        'start',
        'end',
        'class_limit',
        'provider_id',
        'canceled',
        'canceled_at',
      ],
      include: [
        {
          attributes: ['name'],
          model: User,
        },
      ],
      where: {
        provider_id: req.userId,
      },
    });

    return res.json(schedule);
  }
}

export default new ScheduleController();
