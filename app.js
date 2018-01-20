const _ = require('lodash');
const Discord = require('discord.js');
const optional = require('optional');

const settings = optional('./settings');
const addReins = require('./addReins').addReins;
const addReinsForOther = require('./addReins').addReinsForOther;
const addSitter = require('./addReins').addSitter;
const addSitterForOther = require('./addReins').addSitterForOther;
const getReins = require('./getReins').getReins;
const getSimplifiedReins = require('./getReins').getSimplifiedReins;
const deleteReins = require('./deleteReins').deleteReins;
const deleteSitter = require('./deleteReins').deleteSitter;
const deleteReinsFromLocation = require('./deleteReins').deleteReinsFromLocation;
const whereRein = require('./whereRein').whereRein;
const whereClosest = require('./whereRein').whereClosest;
const whereClosestAll = require('./whereRein').whereClosestAll;
const disableSeat = require('./inactiveSeats.js').disableSeat;
const enableSeat = require('./inactiveSeats.js').enableSeat;
const getDisabledSeats = require('./inactiveSeats').getDisabledSeats;
const getAllSitters = require('./dataStore').getAllSitters;
const getAllTables = require('./dataStore').getAllTables;
// const dataStore = require('./dataStore');

// TODO: Look into viewJS (.org ?????)

const client = new Discord.Client();

client.on('ready', () => {
  console.log('Lets fuck shit up!');
});

const rolesWithPermissions = ['Bottom', 'Top', 'Swinger', 'Admin'];

const commandMatches = (expected, message) =>
  _.toLower(message.content).substring(0, expected.length) === _.toLower(expected);

  const allowedChannelsForGetCommands = ['reins', 'losers'];

const checkMessage = (message) => {
  // console.log('message', message.guild.id);
  // if (_.includes(rolesWithPermissions, message.member.highestRole)) {
  console.log('message', message.channel);
  if (_.toLower(message.content).substring(0, 10) === '!addreins*') {
    addReinsForOther(message);
  } else if (_.toLower(message.content).substring(0, 9) === '!addreins') {
    addReins(message);
  } else if (_.toLower(message.content).substring(0, 11) === '!addsitter*') {
    addSitterForOther(message);
  } else if (_.toLower(message.content).substring(0, 10) === '!addsitter') {
    addSitter(message);
  } else if (_.toLower(message.content).substring(0, 9) === '!getreins') {
    if (_.includes(allowedChannelsForGetCommands, message.channel.name)) {
      getReins(message);
    } else {
      message.reply('This channel does not have permissions to use this command.')
    }
  } else if (_.toLower(message.content).substring(0, 9) === '!sumreins') {
    if (_.includes(allowedChannelsForGetCommands, message.channel.name)) {
      getSimplifiedReins(message);
    } else {
      message.reply('This channel does not have permissions to use this command.')
    }
  } else if (_.toLower(message.content).substring(0, 12) === '!delreinsall') {
    if (_.includes(allowedChannelsForGetCommands, message.channel.name)) {
      deleteReinsFromLocation(message);
    } else {
      message.reply('This channel does not have permissions to use this command.')
    }
  } else if (_.toLower(message.content).substring(0, 9) === '!delreins') {
    deleteReins(message);
  } else if (_.toLower(message.content).substring(0, 10) === '!delsitter') {
    deleteSitter(message);
  } else if (_.toLower(message.content).substring(0, 10) === '!whererein') {
    whereRein(message);
  } else if (_.toLower(message.content).substring(0, 10) === '!surrender') {
    if (_.includes(allowedChannelsForGetCommands, message.channel.name)) {
      deleteReinsFromLocation(message);
    } else {
      message.reply('This channel does not have permissions to use this command.')
    }
  } else if (_.toLower(message.content).substring(0, 8) === '!fixshit') {
    message.reply('Nothing To Fix!');
  } else if (_.toLower(message.content).substring(0, 16) === '!whereclosestall') {
    whereClosestAll(message);
  } else if (_.toLower(message.content).substring(0, 13) === '!whereclosest') {
    whereClosest(message);
  } else if (commandMatches('!disableseat', message)) {
    disableSeat(message);
  } else if (commandMatches('!enableseat', message)) {
    enableSeat(message);
  } else if (commandMatches('!disabledseats', message)) {
    getDisabledSeats(message);
  } else if (commandMatches('!getsitters', message)) {
    if (_.includes(allowedChannelsForGetCommands, message.channel.name)) {
      getAllSitters(message);
    } else {
      message.reply('This channel does not have permissions to use this command.')
    }
  }

  // }

  // if (_.toLower(message.content).substring(0, 5) === '!test') {
  //   message.reply('ahhh \n bbbbb');
  // } else if (_.includes(_.toLower(message.content), '!eric')) {
  //   message.reply('HELLO BOOM FACE');
  // }

  // TODO: make the vars below into environment variables
  if (_.toLower(message.content).substring(0, 9) === '!help') {
    message.reply(`
    Commands:

    **Reins**
    !addreins <troopCount> <seatOfPower>
    !addreins* <username>;<troopCount>;<seatOfPower>;
    !getreins [<seatOfPower>] (optional)
    !sumreins
    !delreins <id>
    !delreinsall <location>

    **Sitters**
    !addsitter <troopCount> <seatOfPower>
    !addsitter* <username>;<troopCount>;<seatOfPower>;
    !delsitter <location>

    **Seats**
    !disabledseats
    !disableseat <seat name>
    !enableseat <seat name>
    !surrender <location>
    
    **Other**
    !whererein
    !whereclosest <x>;<y>
    !whereclosestall <x>;<y>
      
    !contribute : To see info about contributing to the code

    For any bug reports or help ask ${process.env.username} or email ${process.env.supportEmail}
    `);
  }

  if (_.includes(_.toLower(message.content), '!ass2mouth')) {
    message.reply('You may want to check out: https://www.netflix.com/title/70123094 :)');
  }

  if (_.toLower(message.content).substring(0, 11) === '!contribute') {
    message.reply('You can contribute here: https://github.com/tocco934/reinsbot');
  }

  if (_.toLower(message.content).substring(0, 6) === '!hello') {
    message.reply(`Hi <@${message.author.id}>!`);
  }

  if (message.content === 'ping') {
    message.reply('pong');
  }
};

client.on('message', message => checkMessage(message));

client.on('ready', () => {
  // client.user.setGame('use !help');
  client.user.setActivity('use !help');
});

client.login(process.env.discordToken || settings.discordToken);

module.exports = {
  checkMessage,
};
