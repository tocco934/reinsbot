const _ = require('lodash');
const dataStore = require('./dataStore');
// const cache = require('memory-cache');
// const cacheKeyGenerator = require('./generateCacheKey').generateKey;

const validateCommand = (splitMessage) => {
  if (splitMessage.length < 2
    || (!_.parseInt(splitMessage[0]) && _.parseInt(splitMessage[0]) !== 0)) {
    throw new Error('Missing addreins params');
  }
};

const parseMessage = (message) => {
  const messageContents = _.trim(_.replace(message.content, /^!addreins/gi, ''));
  const splitMessage = _.split(messageContents, ' ');
  validateCommand(splitMessage);

  return {
    username: message.author.username,
    nickname: _.get(message, 'member.nickname', ''),
    count: _.parseInt(splitMessage[0]),
    location: _.join(_.drop(splitMessage, 1), ' '),
  };
};

const addReins = async (message) => {
  try {
    const parsedMessage = parseMessage(message);
    await dataStore.addReins(parsedMessage);
    // cache.put(cacheKeyGenerator(parsedMessage), JSON.stringify(parsedMessage), 3600000);
    message.reply('Reins Added');
  } catch (e) {
    // console.log(e);
    message.reply('AddReins Usage: !addreins <troopNumber> <seat of power>');
  }
};

module.exports = {
  addReins,
  parseMessage,
  validateCommand,
};
