const db = require('../config/connection');
const { User, Game, Match} = require('../models');
const userSeeds = require('./userSeeds.json');
const gameSeeds = require('./gameSeeds.json')
const matchSeeds = require('./matchSeeds.json')

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Game.deleteMany({});
    await Match.deleteMany({});

    await User.create(userSeeds);
    await Game.create(gameSeeds);
    await Match.create(matchSeeds);

    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Database has been seeded!');
  process.exit(0);
});

