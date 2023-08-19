
const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'pgusernode',
    password: 'RITU26',
    port: 5432,
});


client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch(error => console.error('Error connecting to the database:', error));
module.exports = client;