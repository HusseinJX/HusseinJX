
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('products').del()
      .then(function () {
        // Inserts seed entries
        return knex('products').insert([
          {business_id: 1, product: 'bulb', details:'2w', cost:'3000', price:'5000', inventory: '50' },
          {business_id: 1, product: 'spotlight', details:'50w', cost:'50000', price:'75000', inventory: '50' },
          {business_id: 1, product: 'panel', details:'200w', cost:'100000', price:'150000', inventory: '50' }
        ]);
      });
  };
  