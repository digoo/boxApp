import * as Yup from 'yup';

import User from '../models/User';
import UserLevel from '../models/User-level';

class UserController {
  async index(req, res) {
    const listUsers = await User.findAll({
      attributes: ['id', 'name', 'email', 'user_level_id'],
      include: [
        {
          attributes: ['description'],
          model: UserLevel,
          as: 'userLevel',
        },
      ],
    });
    return res.json(listUsers);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      name: Yup.string().required(),
      last_name: Yup.string(),
      nickname: Yup.string(),
      address: Yup.string().max(255),
      password: Yup.string()
        .required()
        .min(6)
        .max(18),
      repeatPassword: Yup.string()
        .required()
        .min(6)
        .max(18),
      birth: Yup.date().required(),
      user_level_id: Yup.number().default(1), // MUST remove before release
      contact: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    // req.body.birth = parse(req.body.birth, 'dd/MM/yyyy', new Date());

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(403).json({ error: 'User already exists.' });
    }

    if (!(req.body.password === req.body.repeatPassword)) {
      return res.status(401).json({ error: 'Password is not equal' });
    }

    const { name, email } = await User.create(req.body);
    return res.json({
      name,
      email,
      message: `Olá ${name}, seu usuario criado com sucesso`,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      name: Yup.string(),
      last_name: Yup.string(),
      nickname: Yup.string(),
      address: Yup.string().max(255),
      oldPassword: Yup.string()
        .min(6)
        .max(18),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
      birth: Yup.date(),
      user_level_id: Yup.number(), // MUST remove before release
      contact: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });

      if (emailExists) {
        return res
          .status(403)
          .json({ error: 'Email already exists on our database.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { name } = await user.update(req.body);

    return res.json({
      message: `${name} os dados foram atualizados com sucesso`,
    });
  }
}

export default new UserController();
