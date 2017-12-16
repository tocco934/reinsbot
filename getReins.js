const _ = require('lodash');
const dataStore = require('./dataStore');

const parseLocation = (contents) => {
  const commandRemoved = _.trim(_.replace(contents, /^!getreins/gi, ''));
  return commandRemoved;
};

const formatReinforcer = reinforcer => `[${reinforcer.id}] ${reinforcer.username} (${reinforcer.nickname}) ${reinforcer.count}`;

const formatLocationName = (name) => {
  const splitUpName = _.split(name, ' ');
  const formattedName = _.map(splitUpName, _.capitalize);
  return _.join(formattedName, ' ');
};

const getReinsForLocation = async (location) => {
  const entriesForLocation = await dataStore.getReinsByLocation(location);
  const formattedLocation = formatLocationName(location);

  const totalReinforcements = _.sumBy(entriesForLocation, entry => entry.count) || 0;

  if (totalReinforcements === 0) {
    return `No reins found for ${formattedLocation}`;
  }

  const formattedReinforcers = _.map(entriesForLocation, formatReinforcer);
  return `\n
  Seat of Power: ${formattedLocation}
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

  return _.join(_.map(reinsGroupedByLocation, (locationReins) => {
    const totalReinforcements = _.sumBy(locationReins, rein => rein.count);
    const formattedReinforcers = _.map(locationReins, formatReinforcer);
    const formattedLocation = formatLocationName(locationReins[0].location);

    return `\n
Seat of Power: ${formattedLocation}
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
      reply = await getReinsForLocation(location);
    }

    message.reply(reply);
  } catch (e) {
    message.reply('GetReins Usage: !getreins <seat of power>');
  }
};

module.exports = {
  getReins,
};
