module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'plans',
      [
        {
          name: 'Dummy',
          description: 'Dummy',
          checkin_quantity_week: '0',
          price: '0',
          month: '1',
          provider_id: 1,
          isVisible: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('plans', null, {});
  },
};
