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

const createReinsTable = async (serverId) => {
  let client;
  try {
    client = await setupClient();

    const createSyntax = `
      CREATE TABLE IF NOT EXISTS reinsv1_${serverId} (
        id SERIAL PRIMARY KEY,
        location varchar(100) NOT NULL,
        username varchar(100) NOT NULL,
        nickname varchar(100),
        count int NOT NULL,
        isSitter bool default false NOT NULL,
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

const removeReins = async (id, serverId) => {
  let client;
  try {
    client = await setupClient();
    await client.query(`DELETE FROM ONLY reinsv1_${serverId} WHERE id = $1`, [id]);
  } catch (err) {
    console.error('Error deleting reins', err);
  } finally {
    if (client) {
      await client.end();
    }
  }
};

const deleteReinsFromLocation = async (location, serverId) => {
  let client;
  try {
    client = await setupClient();

    await client.query(`DELETE FROM ONLY reinsv1_${serverId} WHERE location = $1`, [_.trim(_.toLower(location))]);
  } catch (err) {
    console.error(`Error deleting reins from ${location}`, err);
  } finally {
    if (client) {
      await client.end();
    }
  }
};

const getReinsByLocation = async (location, serverId) => {
  let client;
  let res;

  try {
    await createReinsTable(serverId);
    client = await setupClient();

    const query = {
      text: `SELECT * FROM reinsv1_${serverId} WHERE location = $1 AND ( issitter = true OR timeAdded > NOW() - INTERVAL '24 hour')`,
      values: [location],
    };

    res = await client.query(query);
  } catch (err) {
    console.error(`Error retrieving reins for ${location}`, err);
  } finally {
    if (client) {
      await client.end();
    }
  }

  return res.rows;
};

const getAllReins = async (serverId) => {
  let client;
  let res;
  try {
    await createReinsTable(serverId);
    client = await setupClient();

    res = await client.query(`SELECT * FROM reinsv1_${serverId} WHERE issitter = true OR timeAdded > NOW() - INTERVAL '24 hour'`);
  } catch (err) {
    console.error('Error retrieving reins', err);
  } finally {
    if (client) {
      await client.end();
    }
  }

  // console.log('res.rows', res.rows);
  return res.rows;
};

const addReins = async (reinInfo, serverId) => {
  let client;
  try {
    await createReinsTable(serverId);
    client = await setupClient();

    // TODO: move query to variable
    const values = [_.trim(_.toLower(reinInfo.location)), reinInfo.username,
      reinInfo.nickname, reinInfo.count];
    await client.query(`INSERT INTO reinsv1_${serverId}(location, username, nickname, count, timeAdded) VALUES($1, $2, $3, $4, NOW())`, values);
  } catch (err) {
    console.error('Error adding reins', err);
  } finally {
    if (client) {
      await client.end();
    }
  }
};

const addSitter = async (reinInfo, serverId) => {
  let client;
  try {
    await createReinsTable(serverId);
    client = await setupClient();

    // TODO: move query to variable
    const values = [_.trim(_.toLower(reinInfo.location)), reinInfo.username,
      reinInfo.nickname, reinInfo.count];
    await client.query(`INSERT INTO reinsv1_${serverId}(location, username, nickname, count, timeAdded, isSitter) VALUES($1, $2, $3, $4, NOW(), true)`, values);
  } catch (err) {
    console.error('Error adding reins', err);
  } finally {
    if (client) {
      await client.end();
    }
  }
};

const removeSitter = async (location, serverId) => {
  let client;
  try {
    client = await setupClient();

    await client.query(`DELETE FROM ONLY reinsv1_${serverId} WHERE location = $1 AND isSitter = true`, [_.trim(_.toLower(location))]);
  } catch (err) {
    console.error(`Error deleting reins from ${location}`, err);
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
  addSitter,
  removeReins,
  removeSitter,
  deleteReinsFromLocation,
};
