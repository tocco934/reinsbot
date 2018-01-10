const _ = require('lodash');
const dataStore = require('./dataStore');
const seatsOfPower = require('./seatsOfPowerHelper');

const disableSeat = async (message) => {
  const givenLocation = _.trim(_.replace(message.content, /^!disableseat/gi, ''));

  if (_.isEmpty(givenLocation)) {
    message.reply('Disable Seat usage: !disableseat <seat name>');
  }

  const locationName = _.get(seatsOfPower.getSeatOfPowerDetails(_.trim(givenLocation)), 'name', givenLocation);

  await dataStore.addInactiveSeat(message.guild.id, locationName);
  return message.reply(`<@everyone> ${locationName} marked as inactive. Please do not send reins there and please pull any existing reins back`);
};

const enableSeat = async (message) => {
  const givenLocation = _.trim(_.replace(message.content, /^!enableseat/gi, ''));

  if (_.isEmpty(givenLocation)) {
    message.reply('Enable Seat usage: !enableseat <seat name>');
  }

  const locationName = _.get(seatsOfPower.getSeatOfPowerDetails(_.trim(givenLocation)), 'name', givenLocation);

  await dataStore.removeInactiveSeat(message.guild.id, locationName);
  return message.reply(`${locationName} has been successfully marked as active!`);
};

const getDisabledSeats = async (message) => {
  const inactiveSeats = await dataStore.getInactiveSeats(message.guild.id);

  if (_.isEmpty(inactiveSeats)) {
    return message.reply('No inactive seats set.');
  }

  const inactiveSeatNames = _.map(inactiveSeats, seat => seat.location);
  const joinedInactiveSeats = _.join(inactiveSeatNames, ', ');
  return message.reply(`Inactive seats: ${joinedInactiveSeats}`);
};

module.exports = {
  disableSeat,
  enableSeat,
  getDisabledSeats,
};
