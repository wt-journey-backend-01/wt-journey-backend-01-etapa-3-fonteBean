/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = function(knex) {
  return knex('casos').del()
    .then(function() {
      return knex('casos').insert([
        {
          id: 1,
          titulo: 'Roubo à joalheria',
          descricao: 'Uma joalheria no centro da cidade foi assaltada na última noite. As câmeras de segurança foram desativadas e não há testemunhas.',
          status: 'aberto',
          agente_id: 1
        },
        {
          id: 2,
          titulo: 'Desaparecimento de pessoa',
          descricao: 'Fulano de Tal, 35 anos, desapareceu após sair de casa para trabalhar. Seu carro foi encontrado abandonado na rodovia.',
          status: 'aberto',
          agente_id: 2
        },
        {
          id: 3,
          titulo: 'Fraude financeira',
          descricao: 'Um grande esquema de fraude foi descoberto em uma empresa multinacional. O valor desviado pode chegar a milhões de reais.',
          status: 'solucionado',
          agente_id: 2
        },
      ]);
    });
};

