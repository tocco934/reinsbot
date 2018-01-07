const _ = require('lodash');

const getSeatOfPowerPosition = (seatName) => {
  switch (_.toLower(seatName)) {
    case 'crakehall':
      return {
        x: 312,
        y: 714,
      };
    case 'faircastle':
      return {
        x: 356,
        y: 968,
      };
    case 'heartshome':
    case 'hearts home':
    case 'heart\'s home':
    case 'heart home':
    case 'hearthome':
    case 'heart\'shome':
    case 'hearts_home':
    case 'hearts-home':
    case 'heart\'s_home':
    case 'heart\'s-home':
      return {
        x: 1117,
        y: 1236,
      };
    case 'bluespine':
      return {
        x: 873,
        y: 853,
      };
    case 'highpoint':
      return {
        x: 797,
        y: 2054,
      };
    case 'ironwrath':
      return {
        x: 733,
        y: 2006,
      };
    case 'karhold':
      return {
        x: 1269,
        y: 2021,
      };
    case 'kayce':
      return {
        x: 308,
        y: 907,
      };
    case 'lemonwood':
      return {
        x: 1203,
        y: 62,
      };
    case 'red Lake':
    case 'red_lake':
    case 'red-lake':
    case 'redlake':
      return {
        x: 436,
        y: 654,
      };
    case 'starfall':
      return {
        x: 552,
        y: 172,
      };
    case 'the arbor':
    case 'thearbor':
    case 'arbor':
    case 'the_arbor':
    case 'the-arbor':
      return {
        x: 248,
        y: 69,
      };
    case 'the crag':
    case 'the_crag':
    case 'thecrag':
    case 'the-crag':
      return {
        x: 416,
        y: 1023,
      };
    case 'threetowers':
    case 'three towers':
    case 'three_towers':
    case 'three-towers':
      return {
        x: 309,
        y: 198,
      };
    default:
      throw new Error('Could not find seat with name');
  }
};

module.exports = {
  getSeatOfPowerPosition,
};
