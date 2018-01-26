const { Client } = require('pg');
const optional = require('optional');

const settings = optional('./settings');

const setupClient = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || settings.dbConnection,
    ssl: true,
  });

  await client.connect((err) => {
    if (err) {
      console.error(err);
      throw err;
    }
  });

  return client;
};
