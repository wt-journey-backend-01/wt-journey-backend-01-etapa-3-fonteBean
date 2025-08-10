/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex('agentes').del()
    .then(function() {
      return knex('agentes').insert([
        { id: 1, nome: 'João Silva', dataDeIncorporacao: '2020-01-15', cargo: 'Investigador Júnior' },
        { id: 2, nome: 'Maria Santos', dataDeIncorporacao: '2018-05-20', cargo: 'Detetive Sênior' },
      ]);
    });
};