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
  const messageContents = _.trim(_.replace(message.content, /^!addreins/gi, ''));
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
    await dataStore.addReins(parsedMessage);
  } catch (err) {
    console.error(err);
    message.reply('Error saving rein data in database');
    return;
  }
  message.reply('Reins Added');
};

module.exports = {
  addReins,
  parseMessage,
  validateCommand,
};
