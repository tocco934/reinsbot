const _ = require('lodash');
const dataStore = require('./dataStore');
const getSeatCoords = require('./seatsOfPower').getSeatOfPowerPosition;

const formatLocationName = (name) => {
  const splitUpName = _.split(name, ' ');
  const formattedName = _.map(splitUpName, _.capitalize);
  return _.join(formattedName, ' ');
};

const whereReinWithCoords = async (message) => {
  try {
    let coords = _.trim(_.replace(message.content), /^!whererein/g, '');
    coords = _.split(coords, ';');
    coords = {
      x: _.parseInt(coords[0]),
      y: _.parseInt(coords[1]),
    };

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

    const locationsWithSumsAndCoords = _.map(locationsWithSums, (location) => {
      const seatCoords = getSeatCoords(location.location);
      const xDifference = (seatCoords.x - coords.x) > 0 ? (seatCoords.x - coords.x) : (coords.x - seatCoords.x);
      const yDifference = (seatCoords.y - coords.y) > 0 ? (seatCoords.y - coords.y) : (coords.y - seatCoords.y);

      // xDifference^2 + yDifference^2 = c^2
      const distanceFromPlayer = Math.sqrt((xDifference ** 2) + (yDifference ** 2));
      return {
        ...location,
        coords,
        distanceFromPlayer,
      };
    });

    // TODO Sort by distanceFromPlayer?
    // TODO How does reins sum factor in??
  } catch (err) {
    console.error(err);
    message.reply('Could not figure out where to send reins.');
  }
};

const whereRein = async (message) => {
  if (_.trim(_.replace(message.content), /^!whererein/g, '')) {
    whereReinWithCoords(message);
  } else {
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
  }
};

module.exports = {
  whereRein,
};
