
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          {id: 1, user: 'Kelvin', email:'kelvin@gmail.com', password:'$2a$10$6AAXF7GGtA23BMcQ3cEoBuUWl/i6OpHwUPypdc6PGjxLzD.z/geEm', birth_date:'01/01/20' },
          {id: 2, user: 'John', email:'john@gmail.com', password:'$2a$10$6AAXF7GGtA23BMcQ3cEoBuUWl/i6OpHwUPypdc6PGjxLzD.z/geEm', birth_date:'01/01/20' },
          {id: 3, user: 'Jack', email:'jack@gmail.com', password:'$2a$10$6AAXF7GGtA23BMcQ3cEoBuUWl/i6OpHwUPypdc6PGjxLzD.z/geEm', birth_date:'01/01/20' }
        ]);
      });
  };
  