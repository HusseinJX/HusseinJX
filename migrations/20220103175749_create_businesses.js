
exports.up = function(knex) {
    return knex.schema.createTable('businesses', (table) => {
        table.increments('business_id').primary();
        // table.integer('role_id').unsigned().references('id').on('roles');
        // table.integer('user_id').unsigned().references('id').on('users');
        table.string('business');
        table.string('email');
        table.string('phone');
        table.string('address');
        table.string('contact_name');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('businesses');
};