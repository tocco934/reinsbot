const _ = require('lodash');
const dataStore = require('../dataStore');

const formatSeatName = (name) => {
  const splitUpName = _.split(name, ' ');
  const formattedName = _.map(splitUpName, _.capitalize);
  return _.join(formattedName, ' ');
};

const calculateSeatTotals = locations =>
  _.map(locations, location => ({
    location: formatSeatName(location[0].location),
    count: _.sumBy(location, 'count'),
  }));

const removeInactiveSeats = async (serverId, locations) => {
  const inactiveSeats = await dataStore.getInactiveSeats(serverId);
  const inactiveSeatNames = _.map(inactiveSeats, 'location');
  return _.filter(locations, location =>
  !_.includes(inactiveSeatNames, location.location));
};

const getAllActiveSeatsWithTotals = async (serverId) => {
  const allReins = await dataStore.getAllReins(serverId);
  const reinsByLocation = _.groupBy(allReins, 'location');
  const activeLocations = await removeInactiveSeats(serverId, reinsByLocation);
  return calculateSeatTotals(activeLocations);
};

const findThreeLowestSeatTotals = async (serverId) => {
  const seatsWithTotals = await getAllActiveSeatsWithTotals(serverId);
  const orderedByLowest = _.sortBy(seatsWithTotals, 'count');
  const lowestThree = _.take(orderedByLowest, 3);
  const lowestThreeLocations = _.map(lowestThree, loc => loc.location);
  return _.join(lowestThreeLocations, ', ');
};

const clearCommand = message => _.trim(_.replace(message, '!whererein', ''));

const whereRein = async (message) => {
  const cleanedMessage = clearCommand(message.content);
  if (cleanedMessage.length === 0) {
    const seatsToRein = await findThreeLowestSeatTotals(message.guild.id);
    message.reply(seatsToRein);
  }
};

module.exports = {
  whereRein,
};
