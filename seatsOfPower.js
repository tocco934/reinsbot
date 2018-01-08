const _ = require('lodash');

const getSeatOfPowerPosition = (seatName) => {
  switch (_.toLower(seatName)) {
    case 'acorn hall':
    case 'acornhall':
    case 'acorn_hall':
    case 'acorn-hall':
      return {
        x: 735,
        y: 994,
      };
    case 'ashemark':
      return {
        x: 494,
        y: 1005,
      };
    case 'ashford castle':
    case 'ashfordcastle':
    case 'ashford_castle':
    case 'ashford-castle':
      return {
        x: 744,
        y: 465,
      };
    case 'baelish castle':
    case 'baelishcastle':
    case 'baelish_castle':
    case 'baelish-castle':
      return {
        x: 1136,
        y: 1405,
      };
    case 'bandallon':
      return {
        x: 308,
        y: 384,
      };
    case 'barrow hall':
    case 'barrowhall':
    case 'barrow_hall':
    case 'barrow-hall':
      return {
        x: 611,
        y: 1642,
      };
    case 'bear island':
    case 'bearisland':
    case 'bear_island':
    case 'bear-island':
      return {
        x: 578,
        y: 2151,
      };
    case 'bitterbridge':
      return {
        x: 746,
        y: 610,
      };
    case 'blackcrown':
      return {
        x: 290,
        y: 233,
      };
    case 'blackmonth':
      return {
        x: 600,
        y: 262,
      };
    case 'bloody gate':
    case 'bloodygate':
    case 'bloody_gate':
    case 'bloody-gate':
      return {
        x: 1044,
        y: 1029,
      };
    case 'bluespine':
      return {
        x: 873,
        y: 853,
      };
    case 'brightwater keep':
    case 'brightwaterkeep':
    case 'brightwater_keep':
    case 'brightwater-keep':
      return {
        x: 385,
        y: 363,
      };
    case 'bronzehearth':
      return {
        x: 403,
        y: 1623,
      };
    case 'casterly rock':
    case 'casterlyrock':
    case 'casterly_rock':
    case 'casterly-rock':
      return {
        x: 367,
        y: 864,
      };
    case 'castle cerwyn':
    case 'castlecerwyn':
    case 'castle_cerwyn':
    case 'castle-cerwyn':
      return {
        x: 766,
        y: 1861,
      };
    case 'castle darry':
    case 'castledarry':
    case 'castle_darry':
    case 'castle-darry':
      return {
        x: 896,
        y: 1112,
      };
    case 'cider hall':
    case 'ciderhall':
    case 'cider_hall':
    case 'cider-hall':
      return {
        x: 642,
        y: 505,
      };
    case 'cleganes keep':
    case 'cleganeskeep':
    case 'clegans_keep':
    case 'clegans-keep':
    case 'clegane\'s keep':
    case 'clegane\'skeep':
    case 'clegan\'s_keep':
    case 'clegan\'s-keep':
      return {
        x: 366,
        y: 777,
      };
    case 'coldmoat':
      return {
        x: 612,
        y: 640,
      };
    case 'coldwater burn':
    case 'coldwaterburn':
    case 'coldwater_burn':
    case 'coldwater-burn':
      return {
        x: 1176,
        y: 1354,
      };
    case 'crakehall':
      return {
        x: 312,
        y: 714,
      };
    case 'deep den':
    case 'deepden':
    case 'deep_den':
    case 'deep-den':
      return {
        x: 541,
        y: 858,
      };
    case 'deepwood motte':
    case 'deepwoodmotte':
    case 'deepwood_motte':
    case 'deepwood-motte':
      return {
        x: 580,
        y: 2000,
      };
    case 'erenford':
      return {
        x: 762,
        y: 1180,
      };
    case 'faircastle':
      return {
        x: 356,
        y: 968,
      };
    case 'feastfires':
      return {
        x: 283,
        y: 853,
      };
    case 'flints finger':
    case 'fintsfinger':
    case 'flints_finger':
    case 'flints-finger':
    case 'flint\'s finger':
    case 'fint\'sfinger':
    case 'flint\'s_finger':
    case 'flint\'s-finger':
      return {
        x: 436,
        y: 1495,
      };
    case 'gates of the moon':
    case 'gatesofthemoon':
    case 'gates_of_the_moon':
    case 'gates-of-the-moon':
      return {
        x: 1105,
        y: 1055,
      };
    case 'ghost hill':
    case 'ghosthill':
    case 'ghost-hill':
    case 'ghost_hill':
      return {
        x: 1214,
        y: 150,
      };
    case 'godsgrace':
      return {
        x: 1075,
        y: 122,
      };
    case 'golden tooth':
    case 'goldentooth':
    case 'golden_tooth':
    case 'golden-tooth':
      return {
        x: 521,
        y: 926,
      };
    case 'goldengrove':
      return {
        x: 537,
        y: 616,
      };
    case 'goldgrass':
      return {
        x: 618,
        y: 1684,
      };
    case 'grassfield keep':
    case 'grassfieldkeep':
    case 'grassfield_keep':
    case 'grassfield-keep':
      return {
        x: 831,
        y: 575,
      };
    case 'grassy vale':
    case 'grassyvale':
    case 'grassy_vale':
    case 'grassy-vale':
      return {
        x: 884,
        y: 576,
      };
    case 'greywater watch':
    case 'greywaterwatch':
    case 'greywater_watch':
    case 'greywater-watch':
    case 'graywater watch':
    case 'graywaterwatch':
    case 'graywater_watch':
    case 'graywater-watch':
      return {
        x: 803,
        y: 1457,
      };
    case 'harrenhal':
      return {
        x: 891,
        y: 965,
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
    case 'hellholt':
      return {
        x: 770,
        y: 129,
      };
    case 'high hermitage':
    case 'highhermitage':
    case 'high_hermitage':
    case 'high-hermitage':
      return {
        x: 582,
        y: 204,
      };
    case 'highgarden':
      return {
        x: 529,
        y: 446,
      };
    case 'highpoint':
      return {
        x: 797,
        y: 2054,
      };
    case 'honeyhold':
      return {
        x: 390,
        y: 316,
      };
    case 'horn hill':
    case 'hornhill':
    case 'horn_hill':
    case 'horn-hill':
      return {
        x: 447,
        y: 386,
      };
    case 'hornvale':
      return {
        x: 579,
        y: 897,
      };
    case 'hornwood':
      return {
        x: 1053,
        y: 1788,
      };
    case 'ironoaks':
      return {
        x: 1238,
        y: 1131,
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
    case 'kings landing':
    case 'kingslanding':
    case 'kings-landing':
    case 'kings_landing':
    case 'king\'s landing':
    case 'king\'slanding':
    case 'king\'s-landing':
    case 'king\'s_landing':
    case 'the iron throne':
    case 'theironthrone':
    case 'ironthrone':
    case 'the_iron_throne':
    case 'iron_throne':
      return {
        x: 1051,
        y: 744,
      };
    case 'kingsgrave':
      return {
        x: 743,
        y: 268,
      };
    case 'last hearth':
    case 'lasthearth':
    case 'last_hearth':
    case 'last-hearth':
      return {
        x: 1087,
        y: 2080,
      };
    case 'lemonwood':
      return {
        x: 1203,
        y: 62,
      };
    case 'long table':
    case 'longtable':
    case 'long_table':
    case 'long-table':
      return {
        x: 697,
        y: 551,
      };
    case 'longbow hall':
    case 'longbowhall':
    case 'longbow_hall':
    case 'longbow-hall':
      return {
        x: 1239,
        y: 1237,
      };
    case 'moat cailin':
    case 'moatcailin':
    case 'moat_cailin':
    case 'moat-cailin':
      return {
        x: 819,
        y: 1560,
      };
    case 'old anchor':
    case 'oldanchor':
    case 'old_anchor':
    case 'old-anchor':
      return {
        x: 1266,
        y: 1158,
      };
    case 'old oak':
    case 'oldoak':
    case 'old_oak':
    case 'old-oak':
      return {
        x: 342,
        y: 583,
      };
    case 'oldcastle':
      return {
        x: 982,
        y: 1507,
      };
    case 'oldtown':
      return {
        x: 362,
        y: 280,
      };
    case 'pinkmaiden':
      return {
        x: 669,
        y: 960,
      };
    case 'raventree hall':
    case 'raventreehall':
    case 'raventree_hall':
    case 'raventree-hall':
      return {
        x: 719,
        y: 1114,
      };
    case 'ramsgate':
      return {
        x: 1141,
        y: 1654,
      };
    case 'red Lake':
    case 'red_lake':
    case 'red-lake':
    case 'redlake':
      return {
        x: 436,
        y: 654,
      };
    case 'rillwater crossing':
    case 'rillwatercrossing':
    case 'rillwater_crossing':
    case 'rillwater-crossing':
      return {
        x: 367,
        y: 1713,
      };
    case 'riverrun':
      return {
        x: 700,
        y: 1046,
      };
    case 'runestone':
      return {
        x: 1315,
        y: 1139,
      };
    case 'saltshore':
      return {
        x: 1076,
        y: 37,
      };
    case 'sandstone':
      return {
        x: 680,
        y: 123,
      };
    case 'sarsfield':
      return {
        x: 431,
        y: 914,
      };
    case 'seagard':
      return {
        x: 702,
        y: 1214,
      };
    case 'silverhill':
      return {
        x: 589,
        y: 762,
      };
    case 'sisterton':
      return {
        x: 1018,
        y: 1454,
      };
    case 'skyreach':
      return {
        x: 702,
        y: 200,
      };
    case 'snakewood':
      return {
        x: 1197,
        y: 1298,
      };
    case 'spearhead':
      return {
        x: 964,
        y: 1278,
      };
    case 'starfall':
      return {
        x: 552,
        y: 172,
      };
    case 'stone hedge':
    case 'stonehedge':
    case 'stone_hedge':
    case 'stone-hedge':
      return {
        x: 819,
        y: 1032,
      };
    case 'strongsong':
      return {
        x: 1001,
        y: 1199,
      };
    case 'sun house':
    case 'sunhouse':
    case 'sun_house':
    case 'sun-house':
      return {
        x: 409,
        y: 102,
      };
    case 'sunspear':
      return {
        x: 1253,
        y: 90,
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
    case 'the banefort':
    case 'thebanefort':
    case 'the_banefort':
    case 'the-banefort':
      return {
        x: 432,
        y: 1080,
      };
    case 'the crag':
    case 'the_crag':
    case 'thecrag':
    case 'the-crag':
      return {
        x: 416,
        y: 1023,
      };
    case 'thedreadfort':
    case 'the dreadfort':
    case 'the dread fort':
    case 'the_dread_fort':
    case 'the-dread-fort':
    case 'the_dreadfort':
    case 'the-dreadfort':
      return {
        x: 1059,
        y: 1911,
      };
    case 'the eyrie':
    case 'theeyrie':
    case 'the_eyrie':
    case 'the-eyrie':
      return {
        x: 1050,
        y: 1089,
      };
    case 'the redfort':
    case 'theredfort':
    case 'the_redfort':
    case 'the-redfort':
      return {
        x: 1142,
        y: 1026,
      };
    case 'the tor':
    case 'thetor':
    case 'the_tor':
    case 'the-tor':
      return {
        x: 1054,
        y: 192,
      };
    case 'the twins':
    case 'thetwins':
    case 'the_twins':
    case 'the-twins':
      return {
        x: 728,
        y: 1293,
      };
    case 'threetowers':
    case 'three towers':
    case 'three_towers':
    case 'three-towers':
      return {
        x: 309,
        y: 198,
      };
    case 'torrhens square':
    case 'torrhenssquare':
    case 'torrhens_square':
    case 'torrhens-square':
    case 'torrhen\'s square':
    case 'torrhen\'ssquare':
    case 'torrhen\'s_square':
    case 'torrhen\'s-square':
      return {
        x: 634,
        y: 1783,
      };
    case 'uplands':
      return {
        x: 435,
        y: 269,
      };
    case 'vaith':
      return {
        x: 1011,
        y: 78,
      };
    case 'wheatfield':
      return {
        x: 847,
        y: 1232,
      };
    case 'white harbor':
    case 'whiteharbor':
    case 'white_harbor':
    case 'white-harbor':
      return {
        x: 930,
        y: 1610,
      };
    case 'wickenden':
      return {
        x: 1158,
        y: 981,
      };
    case 'widows watch':
    case 'widowswatch':
    case 'widows_watch':
    case 'widows-watch':
    case 'widow\'s watch':
    case 'widow\'swatch':
    case 'widow\'s_watch':
    case 'widow\'s-watch':
      return {
        x: 1304,
        y: 1629,
      };
    case 'winterfell':
      return {
        x: 748,
        y: 1905,
      };
    case 'wyl':
      return {
        x: 909,
        y: 343,
      };
    case 'yronwood':
      return {
        x: 878,
        y: 200,
      };
    default:
      throw new Error('Could not find seat with name');
  }
};

module.exports = {
  getSeatOfPowerPosition,
};
