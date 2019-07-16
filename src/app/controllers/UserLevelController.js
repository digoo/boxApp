import * as Yup from 'yup';

import User from '../models/User';
import UserLevel from '../models/User-level';

class UserLevelController {
  async index(req, res) {
    const user = await User.findByPk(req.userId);

    if (!(user.user_level_id > 3)) {
      return res
        .status(403)
        .json({ error: 'Only admin can access this function' });
    }

    const listUserLevel = await UserLevel.findAll({
      attributes: ['name', 'description'],
    });

    return res.json(listUserLevel);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
    });

    const user = await User.findByPk(req.userId);

    if (!(user.user_level_id > 3)) {
      return res
        .status(403)
        .json({ error: 'Only admin can access this function' });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const levelExists = await UserLevel.findOne({
      where: { name: req.body.name },
    });

    if (levelExists) {
      return res.status(400).json({ error: 'This level already exists ' });
    }

    const { name, description } = await UserLevel.create(req.body);

    return res.json({
      message: `new level with name ${name} and description: ${description}, was created with sucess!`,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
    });

    const user = await User.findByPk(req.userId);

    if (!(user.user_level_id > 3)) {
      return res
        .status(403)
        .json({ error: 'Only admin can access this function' });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userLevelToEdit = await UserLevel.findByPk(req.params.id);
    const userLevelToEditbkp = JSON.parse(JSON.stringify(userLevelToEdit));

    if (!userLevelToEdit) {
      return res.status(400).json({ error: 'User level does not exists' });
    }

    await userLevelToEdit.update(req.body);

    return res.json({
      message: 'User level name was changed:',
      from: userLevelToEditbkp.name,
      to: userLevelToEdit.name,
      and: 'User Level description was changed:',
      from1: userLevelToEditbkp.description,
      to1: userLevelToEdit.description,
    });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.userId);

    if (!(user.user_level_id > 3)) {
      return res
        .status(403)
        .json({ error: 'Only admin can access this function' });
    }

    const userLevelToDelete = await UserLevel.findByPk(req.params.id);

    await userLevelToDelete.destroy();

    return res.send();
  }
}

export default new UserLevelController();
