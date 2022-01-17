
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('user_id').primary();
        table.string('user');
        table.string('email');
        table.string('password');
        table.string('birth_date');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};