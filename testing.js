const _ = require('lodash');
const Discord = require('discord.js');
const dataStore = require('./dataStore');

const formatReins = async (message, embed, reins) => {
  const totalReinforcements = _.sumBy(reins, rein => rein.count);
  const inactiveSeat =
    await dataStore.getInactiveSeat(message.guild.is, _.toLower(reins[0].location));

  const fieldTitle = `Seat: ${reins[0].location} Total: 50`;

  const fieldBody = '';
  _.forEach(reins, (rein) => {
    embed.addField(fieldTitle, `- ${rein.nickname} (${rein.username}) ${rein.count}\nBLAHH`);
  });

  return embed;
};

const sendReins = async (message, reinsByLocation) => {
  const first24 = _.take(reinsByLocation,
    reinsByLocation.length >= 24 ? 24 : reinsByLocation.length);
  const embedToSend = await _.reduce(first24, async (embedMsg, location) =>
    formatReins(message, embedMsg, location), new Discord.RichEmbed());

  message.channel.send({ embedToSend });

  if (reinsByLocation.length > 24) {
    sendReins(message, _.slice(reinsByLocation, 24));
  }
};

const sendMessage = (message) => {
  const reins = [{
    id: 1,
    location: 'Casterly Rock',
    username: 'Eirikson',
    nickname: 'House Eirikson',
    count: 30,
    isSitter: false,
  }, {
    id: 1,
    location: 'Casterly Rock',
    username: 'Eirikson',
    nickname: 'House Eirikson',
    count: 30,
    isSitter: false,
  }];
  sendReins(message, reins);
};

module.exports = {
  sendMessage,
  sendReins,
};
