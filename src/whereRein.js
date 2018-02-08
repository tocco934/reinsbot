const _ = require('lodash');
const dataStore = require('../dataStore');
const seatsOfPower = require('../seatsOfPower');

const clearCommand = message => _.trim(_.replace(message, '!whererein', ''));

const calculateSeatTotals = (seatDetails) => {

};

const getAllSeatsWithTotals = async (serverId) => {
  const allSeats = await dataStore.getAllReins(serverId);
  return calculateSeatTotals(allSeats);
};

const findThreeLowestSeatTotals = async (serverId) => {
  const seatsWithTotals = await getAllSeatsWithTotals(serverId);
};

const whereRein = async (message) => {
  const cleanedMessage = clearCommand(message.content);
  if (cleanedMessage.length === 0) {
    const seatsToRein = async findThreeLowestSeatTotals(message.guild.id);
  }
};

module.exports = {
  whereRein,
};
