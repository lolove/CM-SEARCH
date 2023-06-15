/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
//   await knex.raw('CREATE EXTENSION "uuid-ossp";');
  return knex.schema.createTable('articles', (table)=>{
    table.uuid('id').defaultTo(knex.raw("uuid_generate_v4()"))
    table.string('title').notNullable();
    table.string('content');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('articles');
};
