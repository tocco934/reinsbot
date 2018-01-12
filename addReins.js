const _ = require('lodash');
const dataStore = require('./dataStore');
const seatsOfPower = require('./seatsOfPowerHelper');

const validateCommand = (splitMessage) => {
  if (splitMessage.length < 2
    || (!_.parseInt(splitMessage[0]) && _.parseInt(splitMessage[0]) !== 0)) {
    throw new Error('Missing addreins params');
  }
};

const parseInt = (count) => {
  const countWithoutCommas = _.replace(count, ',', '');
  return _.parseInt(countWithoutCommas);
};

const parseMessage = (message) => {
  let messageContents = _.trim(_.replace(message.content, /^!addreins/gi, ''));
  messageContents = _.trim(_.replace(messageContents, /^!addSitter/gi, ''));
  const splitMessage = _.split(messageContents, ' ');
  validateCommand(splitMessage);

  const givenLocation = _.trim(_.join(_.drop(splitMessage, 1), ' '));
  const locationName = _.get(seatsOfPower.getSeatOfPowerDetails(_.trim(givenLocation)), 'name', _.trim(givenLocation));

  return {
    username: message.author.username,
    nickname: _.get(message, 'member.nickname', ''),
    count: parseInt(splitMessage[0]),
    location: locationName,
  };
};

const addReins = async (message) => {
  let parsedMessage;
  try {
    parsedMessage = parseMessage(message);
  } catch (e) {
    return message.reply('AddReins Usage: !addreins <troopNumber> <seat of power>');
  }
  try {
    await dataStore.addReins(parsedMessage, message.guild.id);
  } catch (err) {
    console.error(err);
    return message.reply('Error saving rein data in database');
  }

  const inactiveSeats = await dataStore.getInactiveSeat(message.guild.id, parsedMessage.location);
  if (!_.isEmpty(inactiveSeats)) {
    return message.reply('**WARNING: This seat has been marked as inactive.** Reins have been added, but you should ask/consider if you should choose another seat to rein.');
  }
  return message.reply('Reins Added');
};

const addSitter = async (message) => {
  let parsedMessage;
  try {
    parsedMessage = parseMessage(message);
  } catch (e) {
    return message.reply('AddSitter Usage: !addsitter <troopNumber> <seat of power>');
  }
  try {
    await dataStore.addSitter(parsedMessage, message.guild.id);
  } catch (err) {
    console.error(err);
    return message.reply('Error setting sitter data in database');
  }

  const inactiveSeats = await dataStore.getInactiveSeat(message.guild.id, parsedMessage.location);
  if (!_.isEmpty(inactiveSeats)) {
    return message.reply('**WARNING: This seat has been marked as inactive.** Sitter has been added but make sure you still want this seat marked as disabled.');
  }
  return message.reply('Sitter Added');
};

const addSitterForOther = async (message) => {
  let parsedMessage;
  try {
    const cleanedUpContent = _.trim(_.replace(message.content, /^!addSitter\*/gi, ''));
    const [name, troopCount, givenLocation] = _.split(cleanedUpContent, ';');

    const locationName = _.get(seatsOfPower.getSeatOfPowerDetails(_.trim(givenLocation)), 'name', givenLocation);

    parsedMessage = {
      location: locationName,
      username: name,
      count: troopCount,
    };
  } catch (e) {
    return message.reply('AddSitter* Usage: !addsitter* <username>;<troopNumber>;<seat of power>');
  }
  try {
    await dataStore.addSitter(parsedMessage, message.guild.id);
  } catch (err) {
    console.error(err);
    return message.reply('Error setting sitter data in database');
  }

  const inactiveSeats = await dataStore.getInactiveSeat(message.guild.id, parsedMessage.location);
  if (!_.isEmpty(inactiveSeats)) {
    return message.reply('**WARNING: This seat has been marked as inactive.** Sitter has been added but make sure you still want this seat marked as disabled.');
  }
  return message.reply('Sitter Added');
};

const addReinsForOther = async (message) => {
  const cleanedUpContent = _.trim(_.replace(message.content, /^!addreins\*/gi, ''));
  const [name, troopCount, givenLocation] = _.split(cleanedUpContent, ';');

  const locationName = _.get(seatsOfPower.getSeatOfPowerDetails(_.trim(givenLocation)), 'name', givenLocation);

  const reinsInfo = {
    location: locationName,
    username: name,
    count: troopCount,
  };
  try {
    await dataStore.addReins(reinsInfo, message.guild.id);
  } catch (err) {
    console.error(err);
    return message.reply('Error adding reins in database');
  }

  const inactiveSeats = await dataStore.getInactiveSeat(message.guild.id, locationName);
  if (!_.isEmpty(inactiveSeats)) {
    return message.reply('**WARNING: This seat has been marked as inactive.** Reins have been added, but you should ask/consider if you should choose another seat to rein.');
  }
  return message.reply('Reins Added');
};

const setSitter = async (message) => {
  const [username, location] = _.chain(message.content)
    .replace(/^!setsitter/gi, '')
    .trim()
    .split(';')
    .value();

  if (_.isEmpty(username) || _.isEmpty(location)) {
    return message.reply('Usage: !setsitter <username>;<location>');
  }

  const locationName = _.get(seatsOfPower.getSeatOfPowerDetails(location), 'name', location);

  const sitterInfo = await dataStore.getTroopInfo(message.guild.id, username);

  if (_.isEmpty(sitterInfo)) {
    return message.reply(`Troop info not set for ${username}. Please set that up first before using this command.`);
  }

  const info = {
    location: locationName,
    username,
    count: sitterInfo.troops,
  };

  await dataStore.addSitter(info, message.guild.id);

  return message.reply(`${username} added to ${location}`);
};

module.exports = {
  addReins,
  addReinsForOther,
  addSitter,
  addSitterForOther,
  setSitter,
  parseMessage,
  validateCommand,
};
