module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'exercise_types',
      [
        {
          name: 'Corrida',
          description: 'Corrida',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Musculação',
          description: 'Musculação',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('exercise_types', null, {});
  },
};
