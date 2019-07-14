module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'session_categories',
      [
        {
          name: 'WOD',
          description: 'Workout Of the Day; o treino do dia.',
          unit_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Amrap',
          description:
            'As many rounds/repetitions as possible; quantos rounds ou repetições possíves de uma sequência no tempo determinado do WOD',
          unit_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'EMON',
          description:
            'Every Minute On the Minute; executar uma sequência de exercícios dentro do minuto e descansar no restante do tempo.',
          unit_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Tabata',
          description:
            'O treino tabata tem uma duração total de 4 minutos; sendo 20 segundos realizando o máximo de repetições de um exercício que conseguir e 10 segundos de descanso, por 8 rounds.',
          created_at: new Date(),
          updated_at: new Date(),
          unit_id: 1,
        },
        {
          name: 'Round',
          description: 'Treino baseado em rounds',
          created_at: new Date(),
          updated_at: new Date(),
          unit_id: 1,
        },
        {
          name: 'Laboratório',
          description: 'Tema dinamica',
          created_at: new Date(),
          updated_at: new Date(),
          unit_id: 1,
        },
        {
          name: 'RFT',
          description:
            'Rounds For Time; executar “x” número de rounds no menor tempo possível.',
          created_at: new Date(),
          updated_at: new Date(),
          unit_id: 1,
        },
        {
          name: 'RNFT',
          description:
            'Rounds Not For Time; executar “x” número de rounds sem se preocupar com o tempo, geralmente priorizando técnica e/ou consistência.',
          created_at: new Date(),
          updated_at: new Date(),
          unit_id: 1,
        },
        {
          name: 'RX',
          description:
            'As prescribed; executar o WOD exatamente como prescrito na lousa (padrão de movimentos e cargas propostas pelo coach)',
          created_at: new Date(),
          updated_at: new Date(),
          unit_id: 1,
        },
        {
          name: 'RM',
          description:
            'Repetição máxima; o máximo de carga com a qual você consegue executar “x” número de repetições de um determinado exercício. Exemplo: 1RM de Deadlift, 3RM de Hang Power Clean',
          created_at: new Date(),
          updated_at: new Date(),
          unit_id: 1,
        },
        {
          name: 'Outro / Aberto',
          description: 'Medida para sequencia',
          created_at: new Date(),
          updated_at: new Date(),
          unit_id: 1,
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('session_categories', null, {});
  },
};
