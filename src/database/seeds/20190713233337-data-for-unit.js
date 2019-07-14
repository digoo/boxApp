module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'units',
      [
        {
          name: 'Round',
          description: 'Sequencia',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Metro',
          description: 'Medida comprimento',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Minuto',
          description: 'Medida tempo',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Serie',
          description: 'Medida para sequencia',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('units', null, {});
  },
};
