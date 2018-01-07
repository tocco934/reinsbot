const _ = require('lodash');
const deleteReinsFromDb = require('./dataStore').removeReins;
const deleteAllReinsFromLocation = require('./dataStore').deleteReinsFromLocation;
const removeSitter = require('./dataStore').removeSitter;

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
  const location = _.trim(_.replace(message.content, /^!delreinsall/gi, ''));

  if (location) {
    await deleteAllReinsFromLocation(location, message.guild.id);
    message.reply(`All reins at ${location} deleted`);
  } else {
    message.reply('Usage: !delreinsall <location>');
  }
};

const deleteSitter = async (message) => {
  const location = _.trim(_.replace(message.content, /^!delsitter/gi, ''));

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
