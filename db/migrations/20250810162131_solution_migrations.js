/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('agentes', function(table) {
      table.increments('id');
      table.string('nome').notNullable();
      table.date('dataDeIncorporacao').notNullable();
      table.string('cargo').notNullable();
    })
    .createTable('casos', function(table) {
      table.increments('id');
      table.string('titulo').notNullable();
      table.text('descricao').notNullable();
      table.enu('status', ['aberto', 'solucionado']).notNullable().defaultTo('aberto');
      table.integer('agente_id').unsigned().notNullable();
      table.foreign('agente_id').references('agentes.id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('casos')
    .dropTableIfExists('agentes');
};
