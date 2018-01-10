const _ = require('lodash');
const seatsOfPower = require('./seatsOfPower');

const getSeatOfPowerDetails = (seatName) => {
  switch (_.toLower(seatName)) {
    case 'acorn hall':
    case 'acornhall':
    case 'acorn_hall':
    case 'acorn-hall':
      return seatsOfPower['acorn hall'];
    case 'ashemark':
      return seatsOfPower.ashemark;
    case 'ashford castle':
    case 'ashfordcastle':
    case 'ashford_castle':
    case 'ashford-castle':
      return seatsOfPower['ashford castle'];
    case 'baelish castle':
    case 'baelishcastle':
    case 'baelish_castle':
    case 'baelish-castle':
      return seatsOfPower['baelish castle'];
    case 'bandallon':
      return seatsOfPower.bandallon;
    case 'barrow hall':
    case 'barrowhall':
    case 'barrow_hall':
    case 'barrow-hall':
      return seatsOfPower['barrow hall'];
    case 'bear island':
    case 'bearisland':
    case 'bear_island':
    case 'bear-island':
      return seatsOfPower['bear island'];
    case 'bitterbridge':
      return seatsOfPower.bitterbridge;
    case 'blackcrown':
      return seatsOfPower.blackcrown;
    case 'blackmont':
      return seatsOfPower.blackmont;
    case 'bloody gate':
    case 'bloodygate':
    case 'bloody_gate':
    case 'bloody-gate':
      return seatsOfPower['bloody gate'];
    case 'bluespine':
      return seatsOfPower.bluespine;
    case 'brightwater keep':
    case 'brightwaterkeep':
    case 'brightwater_keep':
    case 'brightwater-keep':
      return seatsOfPower['brightwater keep'];
    case 'bronzehearth':
      return seatsOfPower.bronzehearth;
    case 'brownhollow':
      return seatsOfPower.brownhollow;
    case 'casterly rock':
    case 'casterlyrock':
    case 'casterly_rock':
    case 'casterly-rock':
      return seatsOfPower['casterly rock'];
    case 'castle cerwyn':
    case 'castlecerwyn':
    case 'castle_cerwyn':
    case 'castle-cerwyn':
      return seatsOfPower['castle cerwyn'];
    case 'castle darry':
    case 'castledarry':
    case 'castle_darry':
    case 'castle-darry':
      return seatsOfPower['castle darry'];
    case 'cider hall':
    case 'ciderhall':
    case 'cider_hall':
    case 'cider-hall':
      return seatsOfPower['cider hall'];
    case 'cleganes keep':
    case 'cleganeskeep':
    case 'clegans_keep':
    case 'clegans-keep':
    case 'clegane\'s keep':
    case 'clegane\'skeep':
    case 'clegan\'s_keep':
    case 'clegan\'s - keep':
      return seatsOfPower['cleganes keep'];
    case 'coldmoat':
      return seatsOfPower.coldmoat;
    case 'coldwater burn':
    case 'coldwaterburn':
    case 'coldwater_burn':
    case 'coldwater-burn':
      return seatsOfPower['coldwater burn'];
    case 'crakehall':
      return seatsOfPower.crakehall;
    case 'deep den':
    case 'deepden':
    case 'deep_den':
    case 'deep-den':
      return seatsOfPower['deep den'];
    case 'deepwood motte':
    case 'deepwoodmotte':
    case 'deepwood_motte':
    case 'deepwood-motte':
      return seatsOfPower['deepwood motte'];
    case 'dragonstone':
      return seatsOfPower.dragonstone;
    case 'driftmark':
      return seatsOfPower.driftmark;
    case 'dun fort':
    case 'dunfort':
    case 'dun_fort':
    case 'dun-fort':
      return seatsOfPower['dun fort'];
    case 'dyre den':
    case 'dyreden':
    case 'dyre_den':
    case 'dyre-den':
      return seatsOfPower['dyre den'];
    case 'erenford':
      return seatsOfPower.erenford;
    case 'faircastle':
      return seatsOfPower.faircastle;
    case 'feastfires':
      return seatsOfPower.feastfires;
    case 'flints finger':
    case 'fintsfinger':
    case 'flints_finger':
    case 'flints-finger':
    case 'flint\'s finger':
    case 'fint\'sfinger':
    case 'flint\'s_finger':
    case 'flint\'s - finger':
      return seatsOfPower['flints finger'];
    case 'gates of the moon':
    case 'gatesofthemoon':
    case 'gates_of_the_moon':
    case 'gates-of-the-moon':
      return seatsOfPower['gates of the moon'];
    case 'ghost hill':
    case 'ghosthill':
    case 'ghost-hill':
    case 'ghost_hill':
      return seatsOfPower['ghost hill'];
    case 'godsgrace':
      return seatsOfPower.godsgrace;
    case 'golden tooth':
    case 'goldentooth':
    case 'golden_tooth':
    case 'golden-tooth':
      return seatsOfPower['golden tooth'];
    case 'goldengrove':
      return seatsOfPower.goldengrove;
    case 'goldgrass':
      return seatsOfPower.goldgrass;
    case 'grassfield keep':
    case 'grassfieldkeep':
    case 'grassfield_keep':
    case 'grassfield-keep':
      return seatsOfPower['grassfield keep'];
    case 'grassy vale':
    case 'grassyvale':
    case 'grassy_vale':
    case 'grassy-vale':
      return seatsOfPower['grassy vale'];
    case 'greywater watch':
    case 'greywaterwatch':
    case 'greywater_watch':
    case 'greywater-watch':
    case 'graywater watch':
    case 'graywaterwatch':
    case 'graywater_watch':
    case 'graywater-watch':
      return seatsOfPower['greywater watch'];
    case 'harrenhal':
      return seatsOfPower.harrenhal;
    case 'heartshome':
    case 'hearts home':
    case 'heart\'s home':
    case 'heart home':
    case 'hearthome':
    case 'heart\'shome':
    case 'hearts_home':
    case 'hearts-home':
    case 'heart\'s_home':
    case 'heart\'s - home':
      return seatsOfPower['hearts home'];
    case 'hellholt':
      return seatsOfPower.hellholt;
    case 'high hermitage':
    case 'highhermitage':
    case 'high_hermitage':
    case 'high-hermitage':
      return seatsOfPower['high hermitage'];
    case 'highgarden':
      return seatsOfPower.highgarden;
    case 'highpoint':
      return seatsOfPower.highpoint;
    case 'honeyhold':
      return seatsOfPower.honeyhold;
    case 'horn hill':
    case 'hornhill':
    case 'horn_hill':
    case 'horn-hill':
      return seatsOfPower['horn hill'];
    case 'hornvale':
      return seatsOfPower.hornvale;
    case 'hornwood':
      return seatsOfPower.hornwood;
    case 'ironoaks':
      return seatsOfPower.ironoaks;
    case 'ironwrath':
      return seatsOfPower.ironwrath;
    case 'karhold':
      return seatsOfPower.karhold;
    case 'kayce':
      return seatsOfPower.kayce;
    case 'kings landing':
    case 'kingslanding':
    case 'kings-landing':
    case 'kings_landing':
    case 'king\'s landing':
    case 'king\'slanding':
    case 'king\'s - landing':
    case 'king\'s_landing':
    case 'the iron throne':
    case 'theironthrone':
    case 'ironthrone':
    case 'the_iron_throne':
    case 'iron_throne':
      return seatsOfPower['kings landing'];
    case 'kingsgrave':
      return seatsOfPower.kingsgrave;
    case 'last hearth':
    case 'lasthearth':
    case 'last_hearth':
    case 'last-hearth':
      return seatsOfPower['last hearth'];
    case 'lemonwood':
      return seatsOfPower.lemonwood;
    case 'long table':
    case 'longtable':
    case 'long_table':
    case 'long-table':
      return seatsOfPower['long table'];
    case 'longbow hall':
    case 'longbowhall':
    case 'longbow_hall':
    case 'longbow-hall':
      return seatsOfPower['longbow hall'];
    case 'moat cailin':
    case 'moatcailin':
    case 'moat_cailin':
    case 'moat-cailin':
      return seatsOfPower['moat cailin'];
    case 'old anchor':
    case 'oldanchor':
    case 'old_anchor':
    case 'old-anchor':
      return seatsOfPower['old anchor'];
    case 'old oak':
    case 'oldoak':
    case 'old_oak':
    case 'old-oak':
      return seatsOfPower['old oak'];
    case 'oldcastle':
      return seatsOfPower.oldcastle;
    case 'oldtown':
      return seatsOfPower.oldtown;
    case 'pinkmaiden':
      return seatsOfPower.pinkmaiden;
    case 'raventree hall':
    case 'raventreehall':
    case 'raventree_hall':
    case 'raventree-hall':
      return seatsOfPower['raventree hall'];
    case 'ramsgate':
      return seatsOfPower.ramsgate;
    case 'red Lake':
    case 'red_lake':
    case 'red-lake':
    case 'redlake':
      return seatsOfPower['red Lake'];
    case 'rillwater crossing':
    case 'rillwatercrossing':
    case 'rillwater_crossing':
    case 'rillwater-crossing':
      return seatsOfPower['rillwater crossing'];
    case 'riverrun':
      return seatsOfPower.riverrun;
    case 'rooks rest':
    case 'rooksrest':
    case 'rooks_rest':
    case 'rooks-rest':
    case 'rook\'s rest':
    case 'rook\'srest':
    case 'rook\'s_rest':
    case 'rook\'s - rest':
      return seatsOfPower['rooks rest'];
    case 'rosby':
      return seatsOfPower.rosby;
    case 'runestone':
      return seatsOfPower.runestone;
    case 'saltshore':
      return seatsOfPower.saltshore;
    case 'sandstone':
      return seatsOfPower.sandstone;
    case 'sarsfield':
      return seatsOfPower.sarsfield;
    case 'seagard':
      return seatsOfPower.seagard;
    case 'sharp point':
    case 'sharppoint':
    case 'sharp_point':
    case 'sharp-point':
      return seatsOfPower['sharp point'];
    case 'silverhill':
      return seatsOfPower.silverhill;
    case 'sisterton':
      return seatsOfPower.sisterton;
    case 'skyreach':
      return seatsOfPower.skyreach;
    case 'snakewood':
      return seatsOfPower.snakewood;
    case 'sows horn':
    case 'sowshorn':
    case 'sows_horn':
    case 'sows-horn':
    case 'sow\'s horn':
    case 'sow\'shorn':
    case 'sow\'s_horn':
    case 'sow\'s - horn':
      return seatsOfPower['sows horn'];
    case 'spearhead':
      return seatsOfPower.spearhead;
    case 'starfall':
      return seatsOfPower.starfall;
    case 'stokeworth':
      return seatsOfPower.stokeworth;
    case 'stone hedge':
    case 'stonehedge':
    case 'stone_hedge':
    case 'stone-hedge':
      return seatsOfPower['stone hedge'];
    case 'stonedance':
      return seatsOfPower.stonedance;
    case 'strongsong':
      return seatsOfPower.strongsong;
    case 'sun house':
    case 'sunhouse':
    case 'sun_house':
    case 'sun-house':
      return seatsOfPower['sun house'];
    case 'sunspear':
      return seatsOfPower.sunspear;
    case 'the antlers':
    case 'theantlers':
    case 'the-antlers':
    case 'the_antlers':
      return seatsOfPower['the antlers'];
    case 'the arbor':
    case 'thearbor':
    case 'arbor':
    case 'the_arbor':
    case 'the-arbor':
      return seatsOfPower['the arbor'];
    case 'the banefort':
    case 'thebanefort':
    case 'the_banefort':
    case 'the-banefort':
      return seatsOfPower['the banefort'];
    case 'the crag':
    case 'the_crag':
    case 'thecrag':
    case 'the-crag':
      return seatsOfPower['the crag'];
    case 'thedreadfort':
    case 'the dreadfort':
    case 'the dread fort':
    case 'the_dread_fort':
    case 'the-dread-fort':
    case 'the_dreadfort':
    case 'the-dreadfort':
      return seatsOfPower.thedreadfort;
    case 'the eyrie':
    case 'theeyrie':
    case 'the_eyrie':
    case 'the-eyrie':
      return seatsOfPower['the eyrie'];
    case 'the redfort':
    case 'theredfort':
    case 'the_redfort':
    case 'the-redfort':
      return seatsOfPower['the redfort'];
    case 'the tor':
    case 'thetor':
    case 'the_tor':
    case 'the-tor':
      return seatsOfPower['the tor'];
    case 'the twins':
    case 'thetwins':
    case 'the_twins':
    case 'the-twins':
      return seatsOfPower['the twins'];
    case 'threetowers':
    case 'three towers':
    case 'three_towers':
    case 'three-towers':
      return seatsOfPower['three towers'];
    case 'torrhens square':
    case 'torrhenssquare':
    case 'torrhens_square':
    case 'torrhens-square':
    case 'torrhen\'s square':
    case 'torrhen\'ssquare':
    case 'torrhen\'s_square':
    case 'torrhen\'s - square':
      return seatsOfPower['torrhens square'];
    case 'uplands':
      return seatsOfPower.uplands;
    case 'vaith':
      return seatsOfPower.vaith;
    case 'wheatfield':
      return seatsOfPower.wheatfield;
    case 'white harbor':
    case 'whiteharbor':
    case 'white_harbor':
    case 'white-harbor':
      return seatsOfPower['white harbor'];
    case 'wickenden':
      return seatsOfPower.wickenden;
    case 'widows watch':
    case 'widowswatch':
    case 'widows_watch':
    case 'widows-watch':
    case 'widow\'s watch':
    case 'widow\'swatch':
    case 'widow\'s_watch':
    case 'widow\'s - watch':
      return seatsOfPower['widows watch'];
    case 'winterfell':
      return seatsOfPower.winterfell;
    case 'wyl':
      return seatsOfPower.wyl;
    case 'yronwood':
      return seatsOfPower.yronwood;
    default:
      console.log(`Could not find seat with name ${seatName}`);
      return undefined;
  }
};

module.exports = {
  getSeatOfPowerDetails,
};
