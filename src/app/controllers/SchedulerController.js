import * as Yup from 'yup';
import { endOfDay, parse, format, isPast } from 'date-fns';

import User from '../models/User';
import Schedule from '../models/Schedule';
import ExerciseSchedule from '../models/Exercise-schedule';
import Exercises from '../models/Exercise';
import Sessions from '../models/Session';
import SessionCategories from '../models/Session-category';

class SchedulerController {
  async index(req, res) {
    const checkRegularUser = await User.findOne({
      where: { id: req.userId, user_level_id: [1, 2, 3, 5] },
    });
    if (!checkRegularUser) {
      return res
        .status(400)
        .json({ error: 'User is not able to see the exercise today!' });
    }

    // O O O L L L D D D - Logic here
    // const appointments = await Appointment.findAll({
    //   where: {
    //     provider_id: req.userId,
    //     canceled_at: null,
    //     date: {
    //       [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
    //     },
    //   },
    //   order: ['date'],
    // });
    const scheduler = await ExerciseSchedule.findAll({
      attributes: [
        'date',
        'session_id',
        'session_category_id',
        'exercise_id',
        'duration',
        'start_seq',
        'end_seq',
        'multiplier_seq',
        'schedule_id',
      ],
      include: [
        {
          attributes: ['name'],
          model: Sessions,
        },
        {
          attributes: ['name'],
          model: SessionCategories,
        },
        {
          attributes: ['name'],
          model: Exercises,
        },
      ],
      where: {
        date: new Date(2019, 6, 19),
      },
      order: [
        'created_at',
        'session_id',
        'session_category_id',
        'duration',
        'exercise_id',
      ],
    });

    return res.json(scheduler);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      session_id: Yup.number()
        .integer()
        .required(),
      session_category_id: Yup.number().integer(),
      exercise_id: Yup.number().integer(),
      duration: Yup.number().integer(),
      start_seq: Yup.number().integer(),
      end_seq: Yup.number().integer(),
      multiplier_seq: Yup.number().integer(),
      schedule_id: Yup.number().integer(),
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

    const {
      date,
      session_id,
      session_category_id,
      exercise_id,
      duration,
      start_seq,
      end_seq,
      multiplier_seq,
      schedule_id,
    } = req.body;

    const dateParsed = parse(date, 'MM/dd/yyyy', new Date());

    if (isPast(endOfDay(dateParsed))) {
      return res
        .status(400)
        .json({ error: 'Unable to schedule in the past, check the date' });
    }

    // restrictions part, like unable to have two same sessions_id with same date, etc
    const formatedDate = format(dateParsed, 'MM/dd/yyyy');
    const ExerciseScheduleChecks = await ExerciseSchedule.findAll({
      where: {
        date: formatedDate,
      },
    });

    // Main rule: All data to be checked below are related to date passed as argument (req.body.date)

    // duration -> session_id = tempo
    // duration -> session_category_id = sequence (1 = tabata 1, 2 = tabata 2)
    // duration -> exercise_id = sequence -> pertence à: (1 = tabata 1, 2 = tabata 2)

    // start/end_req -> session_id = null
    // start/end_req -> session_category_id = rounds (start/end)
    // start/end_req -> exercise_id = Peso M/F (start/end)

    // multiplier_req -> session_id = null
    // multiplier_req -> session_category_id = 1 em 1, 2 em 2, 3 em 3 (multiplicador)
    // multiplier_req -> exercise_id = repetição, por ex: 20 push-ups ou 200 metros

    // Rules for session_id
    // If fulfilled but all others (session_cat_id & exercise_id) then it is the main headline
    // it means that it will define the session for the day (Aquecimento/Mobilidade/Forca/Treino/etc)
    // it also means that duration should not be empty since it will be required to set time for the session
    // start_seq/end_seq/multiplier_seq should be null
    // the stars IF was made to return a different message, everytime, that way user can know what is the issue behind it.
    if (
      ExerciseScheduleChecks.length > 0 && // check if exists data on array
      ExerciseScheduleChecks.some(x => x.session_id === session_id) &&
      duration &&
      schedule_id == null &&
      !session_category_id &&
      !exercise_id &&
      !start_seq &&
      !end_seq &&
      !multiplier_seq
    ) {
      return res.status(403).json({
        error: `Unable to create a second session with id#${session_id} for the same selected day`,
      });
    } else if (schedule_id != null) {
      // specific schedules can only be created for sessions
      // for example, if I want an specific/special/additional trainning session for 19:00h
      // please select special session categories to avoid breaking other schedules
      const scheduleExists = await Schedule.findByPk(schedule_id);

      if (!scheduleExists) {
        return res
          .status(400)
          .json({ error: 'Schedule selected does not exists' });
      }
    }

    // Session_category_id: here the rule is the following:
    // 1: if Session_id and session_category_id are fulfilled, duration must also be filled
    // 1-a: duration is the divisor/sequence
    // 1-b: start_seq and end_seq are "round start/end"
    // 1-c: multiplier_seq is the multiplier itself, 1 by 1 or 2 by 2 or 3 by 3 (rounds)
    // 2: duration is used to check sequence of the exercise, for example:
    // 2-a: you can have two tabatas (sc_id = 4) but the duration should be incremental and different
    // 3: by that we can define like, on the Aquecimento, we can have two tabatas with their own exercises
    // 4: exercise here won't be filled, it require a separed line with Session_id and session_category_id fulfilled
    if (
      // main checks to define that we are adding a session_category
      ExerciseScheduleChecks.length > 0 &&
      session_id &&
      session_category_id &&
      !exercise_id &&
      ExerciseScheduleChecks.some(x => x.session_id === session_id) &&
      ExerciseScheduleChecks.some(
        x => x.session_category_id === session_category_id
      ) &&
      ExerciseScheduleChecks.some(x => x.duration === duration)
    ) {
      // Auxiliar checks that session_category can't work with these status
      if (start_seq) {
        if (end_seq) {
          if (multiplier_seq) {
            return res.status(400).json({
              error: `Unable to create a session category`,
              also: 'Please check your data or contact and admin.',
            });
          }
          return res.status(400).json({
            error: `Unable to create a session category`,
            also: `multiplier_seq was not defined`,
          });
        }
        return res.status(400).json({
          error: `Unable to create a session category`,
          also: `End_seq was not defined`,
        });
      }
      return res.status(400).json({
        error: `Unable to create a session category`,
        also: `Start_seq was not defined`,
        Please:
          'If you are sure you did everything correct ,contact an admin immediatly, some logic are not correct',
      });
    }

    // Exercise logic
    if (
      // main checks to define that we are adding a session_category
      ExerciseScheduleChecks.length > 0 &&
      session_id &&
      session_category_id &&
      exercise_id &&
      ExerciseScheduleChecks.some(x => x.session_id === session_id) &&
      ExerciseScheduleChecks.some(
        x => x.session_category_id === session_category_id
      ) &&
      ExerciseScheduleChecks.some(x => x.duration === duration) &&
      ExerciseScheduleChecks.some(x => x.exercise_id === exercise_id) &&
      ExerciseScheduleChecks.some(x => x.multiplier_seq === multiplier_seq)
    ) {
      // Auxiliar checks that session_category can't work with these status
      if (start_seq) {
        if (end_seq) {
          if (multiplier_seq) {
            return res.status(400).json({
              error: `Unable to create repeted exercise with same repetition or meters`,
              also: 'Please check your data or contact and admin.',
            });
          }
          return res.status(400).json({
            error: `Unable to create repeted exercise with same repetition or meters`,
            also: `The exercise series was not defined`,
          });
        }
        return res.status(400).json({
          error: `Unable to create repeted exercise with same repetition or meters`,
          also: `End_seq was not defined`,
        });
      }
      return res.status(400).json({
        error: `Unable to create repeted exercise with same repetition or meters`,
        also: `Start_seq was not defined`,
        Please:
          'If you are sure you did everything correct ,contact an admin immediatly, some logic are not correct',
      });
    }

    // Missing part to create the exercise schedule
    await ExerciseSchedule.create(req.body);

    return res.json({ message: `Exercise for the date: ${date} was created.` });
  }
}

export default new SchedulerController();
