
exports.up = function(knex) {
    return knex.schema.createTable('product_categories', (table) => {
        table.increments('tb_product_category_id').primary();
        table.string('product_category');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('product_categories');
};