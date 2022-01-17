
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('businesses').del()
      .then(function () {
        // Inserts seed entries
        return knex('businesses').insert([
          {id: 1, business: 'Kwaray', email:'kwaray@gmail.com', phone:'12345', address:'Arusha', contact_name: 'Ray' },
          {id: 2, business: 'TCC', email:'TCC@gmail.com', phone:'12345', address:'Arusha', contact_name: 'TCC manager' },
          {id: 3, business: 'Benson', email:'Benson@gmail.com', phone:'12345', address:'Arusha', contact_name: 'Benson front desk' }
        ]);
      });
  };
  