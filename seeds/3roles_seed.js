
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('roles').del()
      .then(function () {
        // Inserts seed entries
        return knex('roles').insert([
          {id: 0, role: 'default'},
          {id: 1, role: 'superadmin'},
          {id: 2, role: 'admin'},
          {id: 3, role: 'manager'}
        ]);
      });
  };
  