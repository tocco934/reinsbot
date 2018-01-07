const _ = require('lodash');
const dataStore = require('./dataStore');

const formatLocationName = (name) => {
  const splitUpName = _.split(name, ' ');
  const formattedName = _.map(splitUpName, _.capitalize);
  return _.join(formattedName, ' ');
};

const whereRein = async (message) => {
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
};

module.exports = {
  whereRein,
};
