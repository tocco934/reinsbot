const _ = require('lodash');
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

const createReinsTable = async () => {
  let client;
  try {
    client = await setupClient();

    const createSyntax = `
      CREATE TABLE IF NOT EXISTS reinsv1 (
        id SERIAL PRIMARY KEY,
        location varchar(100) NOT NULL,
        username varchar(100) NOT NULL,
        nickname varchar(100),
        count int NOT NULL,
        timeAdded timestamp NOT NULL
      );`;

    await client.query(createSyntax);
  } catch (err) {
    console.error('Error creating db table', err);
  } finally {
    if (client) {
      await client.end();
    }
  }
};

const removeReins = async (id) => {
  console.log('id', id);
  let client;
  try {
    client = await setupClient();

    console.log('id', id);
    await client.query('DELETE FROM ONLY reinsv1 WHERE id = $1', [id]);
  } catch (err) {
    console.error('Error deleting reins', err);
  } finally {
    if (client) {
      await client.end();
    }
  }
};

const deleteReinsFromLocation = async (location) => {
  let client;
  try {
    client = await setupClient();

    await client.query('DELETE FROM ONLY reinsv1 WHERE location = $1', [_.toLower(location)]);
  } catch (err) {
    console.error(`Error deleting reins from ${location}`, err);
  } finally {
    if (client) {
      await client.end();
    }
  }
};

const getReinsByLocation = async (location) => {
  let client;
  let res;
  try {
    client = await setupClient();

    res = await client.query('SELECT * FROM reinsv1 WHERE location = $1', [_.toLower(location)]);
  } catch (err) {
    console.error(`Error retrieving reins for ${location}`, err);
  } finally {
    if (client) {
      await client.end();
    }
  }

  return res.rows;
};

const getAllReins = async () => {
  let client;
  let res;
  try {
    client = await setupClient();

    res = await client.query('SELECT * FROM reinsv1');
  } catch (err) {
    console.error('Error retrieving reins', err);
  } finally {
    if (client) {
      await client.end();
    }
  }

  return res.rows;
};

const addReins = async (reinInfo) => {
  let client;
  try {
    client = await setupClient();

    // TODO: move query to variable
    const values = [reinInfo.location, reinInfo.username, reinInfo.nickname, reinInfo.count];
    await client.query('INSERT INTO reinsv1(location, username, nickname, count, timeAdded) VALUES($1, $2, $3, $4, NOW())', values);
  } catch (err) {
    console.error('Error adding reins', err);
  } finally {
    if (client) {
      await client.end();
    }
  }
};

module.exports = {
  createReinsTable,
  getAllReins,
  getReinsByLocation,
  addReins,
  removeReins,
  deleteReinsFromLocation,
};
