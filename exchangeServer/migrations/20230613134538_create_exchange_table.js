/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('exchange_permissions',(table)=>{
    table.uuid('id').defaultTo(knex.raw("uuid_generate_v4()"))
    table.uuid('resourceId')
    table.boolean('isShared')

    // table.foreign('resourceId').references('id').inTable('articles')
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('exchange_permission');
