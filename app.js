const _ = require('lodash');
const Discord = require('discord.js');
const optional = require('optional');

const settings = optional('./settings');
const addReins = require('./addReins').addReins;
const getReins = require('./getReins').getReins;
const dataStore = require('./dataStore');

const client = new Discord.Client();

client.on('ready', () => {
  console.log('Lets fuck shit up!');
});

const rolesWithPermissions = ['Bottom', 'Top', 'Swinger', 'Admin'];

const checkMessage = (message) => {
  // if (_.includes(rolesWithPermissions, message.member.highestRole)) {
  if (_.toLower(message.content).substring(0, 9) === '!addreins') {
    addReins(message);
  } else if (_.toLower(message.content).substring(0, 9) === '!getreins') {
    getReins(message);
  } else if (_.toLower(message.content).substring(0, 9) === '!delreins') {
    message.reply('Command not set up yet');
  }
  // }

  if (_.toLower(message.content).substring(0, 5) === '!test') {
    message.reply('ahhh \n bbbbb');
  } else if (_.includes(_.toLower(message.content), '!eric')) {
    message.reply('HELLO BOOM FACE');
  }

  // TODO: make the vars below into environment variables
  if (_.toLower(message.content).substring(0, 9) === '!help') {
    message.reply(`
    Commands:
      !addreins <troopCount> <seatOfPower>
      !getreins [<seatOfPower>]

    For any bug reports or help ask ${process.env.username} or email ${process.env.supportEmail}
    `);
  }

  if (_.includes(_.toLower(message.content), '!hello')) {
    message.reply(`Hi <@${message.author.id}>!`);
  }

  if (message.content === 'ping') {
    message.reply('pong');
  }
};

client.on('message', message => checkMessage(message));

dataStore.createReinsTable();

client.login(process.env.discordToken || settings.discordToken);

module.exports = {
  checkMessage,
};
