
exports.up = function(knex) {
    return knex.schema.createTable('sales', (table) => {
        table.increments('id').primary();
        // table.integer('role_id').unsigned().references('id').on('roles');
        // table.integer('user_id').unsigned().references('id').on('users');
        table.integer('product_id').unsigned().references('tb_product_id').on('products').onUpdate('CASCADE').onDelete('CASCADE');
        table.double('price');
        table.string('quantity');
        table.date('date');
        table.string('receipt');
        table.integer('business_id').unsigned().references('tb_business_id').on('businesses').onUpdate('CASCADE').onDelete('CASCADE');

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('purchases');
};