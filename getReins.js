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

const formatReinforcements = (reinforcements) => {
  const sitter = _.filter(reinforcements, reinforcement => reinforcement.issitter === true)[0];
  const others = _.filter(reinforcements, reinforcement => reinforcement.issitter === false);

  const formattedOthers = _.map(others, formatReinforcer);

  if (sitter && others.length) {
    const formattedSitter = formatReinforcer(sitter);
    return `
    **${formattedSitter}
    --${_.join(formattedOthers, '\n  --')}`;
  } else if (sitter) {
    const formattedSitter = formatReinforcer(sitter);
    return `
    **${formattedSitter}`;
  }
  return `
    --${_.join(formattedOthers, '\n  --')}`;
};

const getReinsForLocation = async (location, serverId) => {
  const entriesForLocation = await dataStore.getReinsByLocation(_.toLower(location), serverId);
  const formattedLocation = formatLocationName(location);

  const totalReinforcements = _.sumBy(entriesForLocation, entry => entry.count) || 0;

  if (totalReinforcements === 0) {
    return `No reins found for ${formattedLocation}`;
  }

  const formattedReinforcers = formatReinforcements(entriesForLocation);
  return `\n
  Seat of Power: ${formattedLocation}
  Total Reinforcements: ${totalReinforcements}\n
  Reinforcements: ${formattedReinforcers}`;
};

const getReinsForAll = async (serverId) => {
  const reins = await dataStore.getAllReins(serverId);

  if (_.isEmpty(reins)) {
    return 'No reins found.';
  }

  const reinsGroupedByLocation = _.groupBy(reins, rein => _.toLower(rein.location));

  return _.join(_.map(reinsGroupedByLocation, (locationReins) => {
    const totalReinforcements = _.sumBy(locationReins, rein => rein.count);
    const formattedReinforcers = formatReinforcements(locationReins);
    const formattedLocation = formatLocationName(locationReins[0].location);

    return `\n
Seat of Power: ${formattedLocation}
Total Reinforcements: ${totalReinforcements}
Reinforcements: ${formattedReinforcers}`;
  }), '\n\n =========');
};

const getReins = async (message) => {
  try {
    let reply;
    const location = parseLocation(message.content);
    if (_.isEmpty(location)) {
      reply = await getReinsForAll(message.guild.id);
    } else {
      reply = await getReinsForLocation(location, message.guild.id);
    }

    message.reply(reply);
  } catch (e) {
    console.log(e);
    message.reply('GetReins Usage: !getreins [<seat of power>]');
  }
};

module.exports = {
  getReins,
};
