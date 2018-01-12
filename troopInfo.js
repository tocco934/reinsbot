const _ = require('lodash');
const dataStore = require('./dataStore');

//!addsitterinfo <troopCount> <username>
const saveInfo = (message) => {
  const arguments = _.chain(message.content)
    .replace(/^!addtroopinfo/gi, '')
    .trim()
    .split(' ')
    .value();

  const troopCount = arguments[0];
  if (!_.isNumber(troopCount)) {
    return message.reply('Usage: !addtroopinfo <troopCount> <username>');
  }

  // TODO: combine remaining contents of array
  const username = 'something';
  if (_.isEmpty(username)) {
    return message.reply('Usage: !addtroopinfo <troopCount> <username>');
  }

  try {
    await dataStore.saveTroopInfo(message.guild.id, username, troopCount);
  } catch (err) {
    console.error(err);
    return message.reply('An error occurred while trying to save troop info');
  }
  return message.reply('Troop info saved!');
};

//!getsitterinfo <username>
const getInfo = (message) => {
  const username = _.chain(message.content)
    .replace(/^!gettroopinfo/gi, '')
    .trim()
    .value();

  if (_.isEmpty(username)) {
    return message.reply('Usage: !gettroopinfo <username>');
  }

  const troopInfo = await dataStore.getTroopInfo(message.guild.id, username, troopCount);

  if (_.isEmpty(troopInfo)) {
    return message.reply('No troop info was found for that user');
  }

  const messageToReturn = '';
  
  return message.reply(messageToReturn);
};

const deleteInfo = (message) => {
  const username = _.chain(message.content)
  .replace(/^!gettroopinfo/gi, '')
  .trim()
  .value();

  if (_.isEmpty(username)) {
    return message.reply('Missing username. Usage: !deltroopinfo <username>');
  }

  await dataStore.deleteTroopInfo(message.guild.id, username);

  return message.reply(`Troop info for ${username} deleted`);
};

module.exports = {
  saveInfo,
  getInfo,
  deleteInfo,
};
