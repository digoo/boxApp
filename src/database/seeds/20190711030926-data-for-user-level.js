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
        {
          name: 'Professor',
          description: 'This user is the teacher',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Admin',
          description: 'This user is the local Admin from his unit',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'HighAdmin',
          description: 'This user is the global Admin from all units',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Owner',
          description: 'This user is the Owner of the App',
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
