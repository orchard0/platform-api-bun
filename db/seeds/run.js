const seed = require('./seed.js');
const db = require('../connections.js');
const data = require('./data/crs.json');

const runSeed = () => {
	return seed(data).then(() => db.end());
};

runSeed();
