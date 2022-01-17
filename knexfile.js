// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'node_db',
      user:'root',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
