
exports.up = function(knex) {
    return knex.schema.createTable('roles', (table) => {
        table.increments('role_id').primary();
        table.string('role');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('roles');
};
