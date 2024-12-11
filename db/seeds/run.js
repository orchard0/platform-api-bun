const seed = require('./seed.js');
const db = require('../connection.js');
const data = require('./data/stations.json');

const runSeed = async () => {
	await seed(data);
	await db.end();
};

runSeed();
