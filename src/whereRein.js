const _ = require('lodash');
const dataStore = require('../dataStore');
const seatsOfPower = require('../seatsOfPower');

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

const calculateDistance = (seatCoords, playerCoords) => {
  const xDifference = (seatCoords.x - playerCoords.x) > 0
    ? (seatCoords.x - playerCoords.x)
    : (playerCoords.x - seatCoords.x);
  const yDifference = (seatCoords.y - playerCoords.y) > 0
    ? (seatCoords.y - playerCoords.y)
    : (playerCoords.y - seatCoords.y);
  return Math.sqrt((xDifference ** 2) + (yDifference ** 2));
};

const addDistancesToSeats = (seats, playerCoords) =>
  _.compact(
    _.map(seats, (seat) => {
      const seatCoords = _.get(seatsOfPower, [_.toLower(seat.location), 'coords']);

      if (seatCoords) {
        return {
          ...seat,
          distance: calculateDistance(seatCoords, playerCoords),
        };
      }
      console.log(`Seat name ${seat.location} not recognized`);
      return undefined;
    }));

    // Thanks Eric <3
const calculateEricVal = seat => (-0.004 * seat.distance ** 2 + 0.1
  * seat.distance + 100 - 0.00000000025 * seat.count ** 2 - 0.000025
  * seat.count + 100) / 2;

const getSeatsWithCoordsAndFormulaVal = async (serverId, coords) => {
  let x;
  let y;

  if (_.includes(coords, ';')) {
    [x, y] = _.split(coords, ';');
  } else {
    [x, y] = _.split(coords, ' ');
  }

  x = _.parseInt(x);
  y = _.parseInt(y);

  if (_.isNaN(x) || _.isNaN(y)) {
    return 'Error: Coords must be numbers and separated by either a space or a semi-colon';
  }

  const seatsWithTotals = await getAllActiveSeatsWithTotals(serverId);
  const seatsWithDistances = addDistancesToSeats(seatsWithTotals, { x, y });

  return _.map(seatsWithDistances, seat => ({
    ...seat,
    formula: calculateEricVal(seat),
  }));
};

const findThreeLowestByCoordsAndFormula = async (serverId, coords) => {
  const possibleSeats = await getSeatsWithCoordsAndFormulaVal(serverId, coords);
  const orderedByLowest = _.sortBy(possibleSeats, 'formula');
  const lowestThree = _.takeRight(orderedByLowest, 3);
  const lowestThreeLocations = _.map(lowestThree, loc => loc.location);
  return _.join(lowestThreeLocations, ', ');
};

const clearCommand = message => _.trim(_.replace(message, '!whererein', ''));

const whereRein = async (message) => {
  const cleanedMessage = clearCommand(message.content);
  if (cleanedMessage.length === 0) {
    const seatsToRein = await findThreeLowestSeatTotals(message.guild.id);
    message.reply(seatsToRein);
  } else {
    const seatsToRein = await findThreeLowestByCoordsAndFormula(message.guild.id, cleanedMessage);
    message.reply(seatsToRein);
  }
  message.delete();
};

module.exports = {
  whereRein,
};
