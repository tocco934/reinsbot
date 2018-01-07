const _ = require('lodash');
const dataStore = require('./dataStore');

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

  return {
    username: message.author.username,
    nickname: _.get(message, 'member.nickname', ''),
    count: parseInt(splitMessage[0]),
    location: _.toLower(_.join(_.drop(splitMessage, 1), ' ')),
  };
};

const addReins = async (message) => {
  let parsedMessage;
  try {
    parsedMessage = parseMessage(message);
  } catch (e) {
    message.reply('AddReins Usage: !addreins <troopNumber> <seat of power>');
    return;
  }
  try {
    await dataStore.addReins(parsedMessage, message.guild.id);
  } catch (err) {
    console.error(err);
    message.reply('Error saving rein data in database');
    return;
  }
  message.reply('Reins Added');
};

const addSitter = async (message) => {
  let parsedMessage;
  try {
    parsedMessage = parseMessage(message);
  } catch (e) {
    message.reply('AddSitter Usage: !addsitter <troopNumber> <seat of power>');
    return;
  }
  try {
    await dataStore.addSitter(parsedMessage, message.guild.id);
  } catch (err) {
    console.error(err);
    message.reply('Error setting sitter data in database');
    return;
  }
  message.reply('Sitter Added');
};

const addSitterForOther = async (message) => {
  let parsedMessage;
  try {
    const cleanedUpContent = _.trim(_.replace(message.content, /^!addSitter\*/gi, ''));
    const [name, troopCount, location] = _.split(cleanedUpContent, ';');
    parsedMessage = {
      location,
      username: name,
      count: troopCount,
    };
  } catch (e) {
    message.reply('AddSitter* Usage: !addsitter* <username>;<troopNumber>;<seat of power>');
    return;
  }
  try {
    await dataStore.addSitter(parsedMessage, message.guild.id);
  } catch (err) {
    console.error(err);
    message.reply('Error setting sitter data in database');
    return;
  }
  message.reply('Sitter Added');
};

const addReinsForOther = async (message) => {
  const cleanedUpContent = _.trim(_.replace(message.content, /^!addreins\*/gi, ''));
  const [name, troopCount, location] = _.split(cleanedUpContent, ';');
  const reinsInfo = {
    location,
    username: name,
    count: troopCount,
  };
  try {
    await dataStore.addReins(reinsInfo, message.guild.id);
  } catch (err) {
    console.error(err);
    message.reply('Error adding reins in database');
    return;
  }
  message.reply('Reins Added');
};

module.exports = {
  addReins,
  addReinsForOther,
  addSitter,
  addSitterForOther,
  parseMessage,
  validateCommand,
};
