
exports.up = function(knex) {
    return knex.schema.createTable('products', (table) => {
        table.increments('product_id').primary();
        // table.integer('role_id').unsigned().references('id').on('roles');
        // table.integer('user_id').unsigned().references('id').on('users');
        table.integer('business_id').unsigned().references('id').on('businesses').onUpdate('CASCADE').onDelete('CASCADE');
        table.string('product');
        table.string('details');
        table.string('inventory');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('products');
};