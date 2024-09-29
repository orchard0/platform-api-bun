const db = require('../connections.js');
const format = require('pg-format');

module.exports = seed = (data) => {
	return db
		.query(`DROP TABLE IF EXISTS stations;`)
		.then(() => {
			return db.query(`
      CREATE TABLE stations (
        crs VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL,
        nlc VARCHAR,
        created_at TIMESTAMP DEFAULT NOW()
      );`);
		})
		.then(() => {
			const insertStationsQueryStr = format(
				'INSERT INTO stations (name, crs, nlc) VALUES %L returning *;',
				data.map(({ station, crs, nlc }) => [station, crs, nlc])
			);
			return db.query(insertStationsQueryStr);
		});
};
