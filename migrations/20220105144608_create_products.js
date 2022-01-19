
exports.up = function(knex) {
    return knex.schema.createTable('products', (table) => {
        table.increments('tb_product_id').primary();
        // table.integer('role_id').unsigned().references('id').on('roles');
        // table.integer('user_id').unsigned().references('id').on('users');
        table.integer('business_id').unsigned().references('tb_business_id').on('businesses').onUpdate('CASCADE').onDelete('CASCADE');
        table.string('product');
        table.string('details');
        table.integer('product_category_id').unsigned().references('tb_product_category_id').on('product_categories').onUpdate('CASCADE').onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('products');
};