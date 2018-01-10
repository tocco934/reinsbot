const _ = require('lodash');
const { Client } = require('pg');
const optional = require('optional');
const Promise = require('bluebird');

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
    console.error('Error creating reinsv1 table', err);
  } finally {
    if (client) {
      await client.end();
    }
  }
};

const createInactiveTable = async (serverId) => {
  let client;
  try {
    client = await setupClient();

    const createSyntax = `
      CREATE TABLE IF NOT EXISTS seatstatusv1_${serverId} (
        location varchar(100) PRIMARY KEY,
        inactive bool default false NOT NULL,
        timeAdded timestamp NOT NULL
      );`;

    await client.query(createSyntax);
  } catch (err) {
    console.error('Error creating seatstatusv1 table', err);
  } finally {
    if (client) {
      await client.end();
    }
  }
};

const setupTables = async (serverId) => {
  await Promise.all([createReinsTable(serverId), createInactiveTable(serverId)]);
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
    await setupTables(serverId);
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
    await setupTables(serverId);
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
    await setupTables(serverId);
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
    await setupTables(serverId);
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

const addInactiveSeat = async (serverId, seatName) => {
  let client;
  try {
    client = await setupClient();

    const values = [seatName];
    const insertStatement = `INSERT INTO seatstatusv1_${serverId}(location, inactive, timeAdded) VALUES ($1, true, NOW())`;
    await client.query(insertStatement, values);
  } catch (err) {
    console.error(`Error setting seat ${seatName} inactive`, err);
  } finally {
    if (client) {
      await client.end();
    }
  }
};

const removeInactiveSeat = async (serverId, seatName) => {
  let client;
  try {
    client = await setupClient();

    await client.query(`DELETE FROM ONLY seatstatusv1_${serverId} WHERE location = $1`, [seatName]);
  } catch (err) {
    console.error(`Error deleting inactive seat ${seatName}`, err);
  } finally {
    if (client) {
      await client.end();
    }
  }
};

const getInactiveSeats = async (serverId) => {
  let client;
  let res;
  try {
    await setupTables(serverId);
    client = await setupClient();

    res = await client.query(`SELECT * FROM seatstatusv1_${serverId} WHERE inactive = true`);
  } catch (err) {
    console.error('Error retrieving inactive seats', err);
  } finally {
    if (client) {
      await client.end();
    }
  }
  return res.rows;
};

const getInactiveSeat = async (serverId, seatName) => {
  let client;
  let res;

  try {
    await setupTables(serverId);
    client = await setupClient();

    const query = {
      text: `SELECT * FROM seatstatusv1_${serverId} WHERE location = $1`,
      values: [seatName],
    };

    res = await client.query(query);
  } catch (err) {
    console.error(`Error retrieving inactive seat ${seatName}`, err);
  } finally {
    if (client) {
      await client.end();
    }
  }

  return res.rows;
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
  addInactiveSeat,
  removeInactiveSeat,
  getInactiveSeats,
  getInactiveSeat,
};
