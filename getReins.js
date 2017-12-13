const _ = require('lodash');
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

  const formattedReinforcers = _.map(cacheEntriesForLocation, entry => `${entry.username} (${entry.nickname}) ${entry.count}`);
  return `\n
  Seat of Power: ${location}
  Total Reinforcements: ${totalReinforcements}\n
  Reinforcements:
  --${_.join(formattedReinforcers, '\n  --')}`;
};

const getReinsForAll = () => {
  const cacheKeys = cache.keys();
  const allLocations = _.map(cacheKeys, key => _.split(key, '-')[0]);
  const locations = _.sortBy(_.uniq(allLocations));

  return _.join(_.map(locations, getReinsForLocation), '\n\n =========');
};

const getReins = (message) => {
  try {
    let reply;
    const location = parseLocation(message.content);
    if (_.isEmpty(location)) {
      reply = getReinsForAll();
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
