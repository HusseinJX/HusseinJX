
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('products').del()
      .then(function () {
        // Inserts seed entries
        return knex('products').insert([
          {tb_product_id: 1, product: 'bulb', details:'2w' },
          {tb_product_id: 2, product: 'spotlight', details:'50w'},
          {tb_product_id: 3, product: 'panel', details:'200w'}
        ]);
      });
  };
  