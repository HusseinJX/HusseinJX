
exports.up = function(knex) {
    return knex.schema.createTable('sessions', (table) => {
        table.increments('tb_session_id').primary();
        table.string('year');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('sessions');
};
