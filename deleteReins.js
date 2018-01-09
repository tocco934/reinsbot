const _ = require('lodash');
const deleteReinsFromDb = require('./dataStore').removeReins;
const deleteAllReinsFromLocation = require('./dataStore').deleteReinsFromLocation;
const removeSitter = require('./dataStore').removeSitter;
const seatsOfPower = require('./seatsOfPowerHelper');

const deleteReins = async (message) => {
  const messageParams = _.replace(message.content, /^!delreins/gi, '');
  const id = _.parseInt(messageParams);

  if (_.isInteger(id)) {
    await deleteReinsFromDb(id, message.guild.id);
    message.reply(`Reins with id: ${id} deleted`);
  } else {
    message.reply(`Usage: !delreins <id>\n
    You can get the id from the !getreins command`);
  }
};

const deleteReinsFromLocation = async (message) => {
  let location = _.trim(_.replace(message.content, /^!delreinsall/gi, ''));
  location = _.trim(_.replace(location, /^!surrender/gi, ''));
  location = _.get(seatsOfPower.getSeatOfPowerDetails(location), 'name', location);


  if (location) {
    await deleteAllReinsFromLocation(location, message.guild.id);
    message.reply(`Seat ${location} Surrendered`);
  } else {
    message.reply('Usage: !surrender <location>');
  }
};

const deleteSitter = async (message) => {
  let location = _.trim(_.replace(message.content, /^!delsitter/gi, ''));
  location = _.get(seatsOfPower.getSeatOfPowerDetails(location), 'name', location);

  if (location) {
    await removeSitter(location, message.guild.id);
    message.reply(`Sitter at ${location} deleted`);
  } else {
    message.reply('Usage: !delsitter <location>');
  }
};

module.exports = {
  deleteReins,
  deleteSitter,
  deleteReinsFromLocation,
};
