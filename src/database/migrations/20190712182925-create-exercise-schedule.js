module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('exercise_schedules', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      session_id: {
        type: Sequelize.INTEGER,
        references: { model: 'sessions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      session_category_id: {
        type: Sequelize.INTEGER,
        references: { model: 'session_categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      exercise_id: {
        type: Sequelize.INTEGER,
        references: { model: 'exercises', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      duration: {
        type: Sequelize.INTEGER,
      },
      start_seq: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      end_seq: {
        type: Sequelize.INTEGER,
      },
      multiplier_seq: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      schedule_id: {
        type: Sequelize.INTEGER,
        references: { model: 'schedules', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('exercise_schedules');
  },
};
