const _ = require('lodash');
const dataStore = require('./dataStore');
const seatsOfPower = require('./seatsOfPower');

const formatLocationName = (name) => {
  const splitUpName = _.split(name, ' ');
  const formattedName = _.map(splitUpName, _.capitalize);
  return _.join(formattedName, ' ');
};

const whereRein = async (message) => {
  // if (_.trim(_.replace(message.content), /^!whererein/g, '')) {
  //   whereReinWithCoords(message);
  // } else {
  try {
    const reins = await dataStore.getAllReins(message.guild.id);

    if (_.isEmpty(reins)) {
      message.reply('No reins found.');
    }

    const reinsGroupedByLocation = _.groupBy(reins, rein => _.toLower(rein.location));
    const locationsWithSums = _.map(reinsGroupedByLocation, (locationReins) => {
      const totalReinforcements = _.sumBy(locationReins, rein => rein.count);
      return {
        location: formatLocationName(locationReins[0].location),
        count: totalReinforcements,
      };
    });

    const orderedByLowest = _.sortBy(locationsWithSums, 'count');
    const lowestThree = _.take(orderedByLowest, 3);
    const lowestThreeLocations = _.map(lowestThree, loc => loc.location);

    const replyMessage = _.join(lowestThreeLocations, ', ');
    message.reply(replyMessage);
  } catch (err) {
    console.error(err);
    message.reply('Could not figure out where to send reins');
  }
  // }
};

const calculateDistances = (x, y) =>
  _.map(seatsOfPower, (seat) => {
    const xDifference = (seat.coords.x - x) > 0 ? (seat.coords.x - x) : (x - seat.coords.x);
    const yDifference = (seat.coords.y - y) > 0 ? (seat.coords.y - y) : (y - seat.coords.y);
    const distanceFromPlayer = Math.sqrt((xDifference ** 2) + (yDifference ** 2));

    return {
      ...seat,
      distance: distanceFromPlayer,
    };
  });

const getSeatsWithCalculatedDistances = (message, command) => {
  const commandRegex = new RegExp(`^${command}`, 'g');
  const coords = _.trim(_.replace(message.content), commandRegex, '');
  if (_.isEmpty(coords)) {
    throw new Error('No Coords Included!');
  }

  let [x, y] = _.split(_.trim(coords), ';');
  x = _.parseInt(x);
  y = _.parseInt(y);
  if (!_.isNumber(x) || !_.isNumber(y)) {
    throw new Error('coords cannot be parsed into integers');
  }
  const seatsWithDistances = calculateDistances(x, y);

  return _.sortBy(seatsWithDistances, 'distance');
};

const whereClosest = async (message) => {
  let seats;
  try {
    seats = getSeatsWithCalculatedDistances(message, '!whereclosest');
  } catch (e) {
    console.log(e);
    return message.reply('Usage: !whereclosest <x>;<y>');
  }

  const reins = await dataStore.getAllReins(message.guild.id);
  const uniqueLocations = _.unionBy(reins, 'location').map(rein => rein.location);
  const seatsWeOwn = _.filter(seats, seat => _.includes(uniqueLocations, seat.name));

  const threeClosest = _.take(seatsWeOwn, 3);
  if (_.isEmpty(threeClosest)) {
    return message.reply('No nearby seats found. Try setting some reins first!');
  }
  return message.reply(_.join(_.map(threeClosest, seat => `${seat.name}`), ', '));
};

const whereClosestAll = async (message) => {
  let seats;
  try {
    seats = getSeatsWithCalculatedDistances(message, '!whereclosestall');
  } catch (e) {
    console.log(e);
    return message.reply('Usage: !whereclosestall <x>;<y>');
  }

  const threeClosest = _.take(seats, 3);
  return message.reply(_.join(_.map(threeClosest, seat => `${seat.name}`), ', '));
};

module.exports = {
  whereRein,
  whereClosest,
  whereClosestAll,
};
