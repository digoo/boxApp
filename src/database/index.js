import Sequelize from 'sequelize';
import Mongoose from 'mongoose';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Plan from '../app/models/Plan';
import UserLevel from '../app/models/User-level';
import UserSchedule from '../app/models/User-schedule';
import Schedule from '../app/models/Schedule';
import Exercise from '../app/models/Exercise';
import Unit from '../app/models/Unit';
import ExerciseType from '../app/models/Exercise-type';
import ExerciseSchedule from '../app/models/Exercise-schedule';
import Session from '../app/models/Session';
import SessionCategory from '../app/models/Session-category';

const models = [
  User,
  File,
  Plan,
  UserLevel,
  UserSchedule,
  Schedule,
  Exercise,
  Unit,
  ExerciseType,
  ExerciseSchedule,
  Session,
  SessionCategory,
];

class Database {
  constructor() {
    this.connection = new Sequelize(databaseConfig);

    this.init();
    this.associate();
    this.mongo();
  }

  init() {
    models.forEach(model => model.init(this.connection));
  }

  associate() {
    models.forEach(model => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }

  mongo() {
    this.mongoConnection = Mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
    });
  }
}

export default new Database();
