const _ = require('lodash');
const { Client } = require('pg');
const settings = require('./settings');

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

const createReinsTable = async () => {
  const client = await setupClient();

  const createSyntax = `
  CREATE TABLE IF NOT EXISTS reinsv1 (
    location varchar(100) NOT NULL,
    username varchar(100) NOT NULL,
    nickname varchar(100),
    count int NOT NULL,
    timeAdded timestamp NOT NULL
  );`;

  await client.query(createSyntax);
  await client.end();
};

const getAllReins = async () => {
  const client = await setupClient();

  // TODO: add try/catch ??
  const res = await client.query('SELECT * FROM reinsv1');
  await client.end();

  console.log('rows', res.rows);

  return res.rows;
};

const addReins = async (reinInfo) => {
  const client = await setupClient();

  // TODO: move query to variable
  // TODO: try/catch
  const values = [reinInfo.location, reinInfo.username, reinInfo.nickname, reinInfo.count];
  await client.query('INSERT INTO reinsv1(location, username, nickname, count, timeAdded) VALUES($1, $2, $3, $4, NOW())', values);
  await client.end();
};

module.exports = {
  createReinsTable,
  getAllReins,
  addReins,
};
