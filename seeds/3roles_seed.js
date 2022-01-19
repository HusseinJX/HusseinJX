
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('roles').del()
      .then(function () {
        // Inserts seed entries
        return knex('roles').insert([
          {tb_role_id: 1, role: 'default'},
          {tb_role_id: 2, role: 'superadmin'},
          {tb_role_id: 3, role: 'admin'},
          {tb_role_id: 4, role: 'manager'}
        ]);
      });
  };
  