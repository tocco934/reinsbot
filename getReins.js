const _ = require('lodash');
const Promise = require('bluebird');
const dataStore = require('./dataStore');
const seatsOfPower = require('./seatsOfPowerHelper');
const messageHelper = require('./messagePaging').sendMessage;

const parseLocation = (contents) => {
  const commandRemoved = _.trim(_.replace(contents, /^!getreins/gi, ''));
  if (commandRemoved) {
    return _.get(seatsOfPower.getSeatOfPowerDetails(_.trim(commandRemoved)), 'name', commandRemoved);
  }
  return undefined;
};

const getCurrentSitter = reinforcements =>
  _(reinforcements)
    .filter('issitter')
    .sort('timeAdded')
    .last();

const formatReinforcer = reinforcer => `[${reinforcer.id}] ${reinforcer.username} (${reinforcer.nickname}) ${reinforcer.count.toLocaleString()}`;

const formatLocationName = (name) => {
  const splitUpName = _.split(name, ' ');
  const formattedName = _.map(splitUpName, _.capitalize);
  return _.join(formattedName, ' ');
};

const formatReinforcements = (reinforcements) => {
  const sitter = getCurrentSitter(reinforcements);

  const others = _.filter(reinforcements, reinforcement => reinforcement.issitter === false);

  const formattedOthers = _.map(others, formatReinforcer);

  if (sitter && !_.isEmpty(sitter) && others.length) {
    const formattedSitter = formatReinforcer(sitter);
    return `
   *-${formattedSitter}
    --${_.join(formattedOthers, '\n  --')}`;
  } else if (sitter && !_.isEmpty(sitter)) {
    const formattedSitter = formatReinforcer(sitter);
    return `
   *-${formattedSitter}`;
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

  const inactiveSeat = await dataStore.getInactiveSeat(serverId, _.toLower(formattedLocation));

  const formattedReinforcers = formatReinforcements(entriesForLocation);
  return `\n
  Seat of Power: ${formattedLocation} ${_.isEmpty(inactiveSeat) ? '' : '- **INACTIVE**'}
  Total Reinforcements: ${totalReinforcements.toLocaleString()}${totalReinforcements >= 1200000 ? ' Cos Fuck Dedo' : ''}\n
  Reinforcements: ${formattedReinforcers}`;
};

const getSimplifiedReins = async (message) => {
  const reins = await dataStore.getAllReins(message.guild.id);

  if (_.isEmpty(reins)) {
    message.reply('No reins found.');
  }

  const reinsGroupedByLocation = _.groupBy(reins, rein => _.toLower(rein.location));

  const messagesToSend = await Promise.all(_.map(reinsGroupedByLocation, async (locationReins) => {
    const totalReinforcements = _.sumBy(locationReins, rein => rein.count);
    const formattedLocation = formatLocationName(locationReins[0].location);

    const sitter = getCurrentSitter(locationReins);
    const formattedSitter = sitter ? `${sitter.username} (${sitter.nickname})` : undefined;

    const inactiveSeat =
      await dataStore.getInactiveSeat(message.guild.id, _.toLower(formattedLocation));

    return `\n
Seat of Power: ${formattedLocation} ${_.isEmpty(inactiveSeat) ? '' : '- **INACTIVE**'}
Sitter: ${formattedSitter}
Total Reinforcements: ${totalReinforcements.toLocaleString()}`;
  }));

  message.reply(_.join(messagesToSend, '\n\n ========='));
};

const getReinsForAll = async (serverId) => {
  const reins = await dataStore.getAllReins(serverId);

  if (_.isEmpty(reins)) {
    return 'No reins found.';
  }

  const reinsGroupedByLocation = _.groupBy(reins, rein => _.toLower(rein.location));

  const messageToSend = await Promise.all(_.map(reinsGroupedByLocation, async (locationReins) => {
    const totalReinforcements = _.sumBy(locationReins, rein => rein.count);
    const formattedReinforcers = formatReinforcements(locationReins);
    const formattedLocation = formatLocationName(locationReins[0].location);

    const inactiveSeat =
      await dataStore.getInactiveSeat(serverId, _.toLower(formattedLocation));

    return `\n
Seat of Power: **${formattedLocation}** ${_.isEmpty(inactiveSeat) ? '' : '- **INACTIVE**'}
Total Reinforcements: ${totalReinforcements.toLocaleString()}
Reinforcements: ${formattedReinforcers}`;
  }));


  return _.join(messageToSend, '\n\n =========');
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

    return messageHelper(message, reply);
    // message.reply(reply);
  } catch (e) {
    console.error(e);
    return message.reply('GetReins Usage: !getreins [<seat of power>]');
  }
};

module.exports = {
  getReins,
  getSimplifiedReins,
};
