
exports.up = function(knex) {
    return knex.schema.createTable('user_roles', (table) => {
        table.increments('id').primary();
        table.integer('business_id').unsigned().references('id').on('businesses').onUpdate('CASCADE').onDelete('CASCADE');
        table.integer('user_id').unsigned().references('id').on('users').onUpdate('CASCADE').onDelete('CASCADE');
        table.integer('role_id').unsigned().references('id').on('roles').onUpdate('CASCADE').onDelete('CASCADE');
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.timestamp('created_at').defaultTo(knex.fn.now());
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('user_roles');
};