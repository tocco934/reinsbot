const _ = require('lodash');
const dataStore = require('./dataStore');
const cache = require('memory-cache');

const parseLocation = (contents) => {
  const commandRemoved = _.trim(_.replace(contents, /^!getreins/gi, ''));
  return commandRemoved;
};

const getReinsForLocation = (location) => {
  const cacheKeys = cache.keys();
  const keysFilteredByLocation = _.filter(cacheKeys, key => key.includes(location));
  const cacheEntriesForLocation = _.map(keysFilteredByLocation, key =>
    JSON.parse(cache.get(key)));

  const totalReinforcements = _.sumBy(cacheEntriesForLocation, entry => entry.count) || 0;

  if (totalReinforcements === 0) {
    return `No reins found for ${location}`;
  }

  const formattedReinforcers = _.map(cacheEntriesForLocation, entry => `${entry.id} ${entry.username} (${entry.nickname}) ${entry.count}`);
  return `\n
  Seat of Power: ${location}
  Total Reinforcements: ${totalReinforcements}\n
  Reinforcements:
  --${_.join(formattedReinforcers, '\n  --')}`;
};

const getReinsForAll = async () => {
  const reins = await dataStore.getAllReins();

  if (_.isEmpty(reins)) {
    return 'No reins found.';
  }

  const reinsGroupedByLocation = _.groupBy(reins, rein => _.toLower(rein.location));

  // TODO: format location to capitalize. Have to do it individually for each part
  // TODO: chain this and pull formatting into different function
  return _.join(_.map(reinsGroupedByLocation, (locationReins) => {
    const totalReinforcements = _.sumBy(locationReins, rein => rein.count);
    const formattedReinforcers = _.map(locationReins, entry => `${entry.id} ${entry.username} (${entry.nickname}) ${entry.count}`);

    return `\n
Seat of Power: ${_.capitalize(locationReins[0].location)}
Total Reinforcements: ${totalReinforcements}
Reinforcements:
 --${_.join(formattedReinforcers, '\n --')}`;
  }), '\n\n =========');
};

const getReins = async (message) => {
  try {
    let reply;
    const location = parseLocation(message.content);
    if (_.isEmpty(location)) {
      reply = await getReinsForAll();
    } else {
      reply = getReinsForLocation(location);
    }

    message.reply(reply);
  } catch (e) {
    message.reply('GetReins Usage: !getreins <seat of power>');
  }
};

module.exports = {
  getReins,
};
