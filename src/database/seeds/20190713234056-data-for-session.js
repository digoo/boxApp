module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'sessions',
      [
        {
          name: 'Soltura Articular',
          description: 'Fase pré-treino',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Aquecimento',
          description: 'Fase inicial do treino',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Mobilidade/Flexibilidade',
          description: 'Fase secundaria, de aperfeiçoamento ou condicionamento',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Força/Técnica',
          description: 'Fase secundaria, de aperfeiçoamento ou condicionamento',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Treino',
          description: 'Fase principal',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Treino Full',
          description: 'Fase principal',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Desafios',
          description: 'Fase opcional',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Treino em Dupla',
          description: 'Fase principal em dupla',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Treino em Grupo',
          description: 'Fase principal em grupo',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Protocolo',
          description: 'Fase especial, pode substituir o treino',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('sessions', null, {});
  },
};
