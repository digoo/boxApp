module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'user_levels',
      [
        {
          name: 'User',
          description: 'Regular User',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('user_levels', null, {});
  },
};
