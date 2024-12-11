const db = require('../connection');
const format = require('pg-format');

module.exports = seed = (data) => {
	const values = (data) => {
		const result = [];
		for (item in data) {
			if (!data[item].length) continue;
			const {
				classification,
				crsCode: crs,
				latitude,
				longitude,
				name,
				operator,
				postcode,
			} = data[item][0];
			const info = [
				crs,
				name,
				classification,
				latitude,
				longitude,
				operator,
				postcode,
			];
			result.push(info);
		}
		return result;
	};

	return db
		.query(`DROP TABLE IF EXISTS stations;`)
		.then(() => {
			return db.query(`
      CREATE TABLE stations (
        crs VARCHAR(3) PRIMARY KEY,
        name VARCHAR NOT NULL,
        classification VARCHAR NOT NULL,
        latitude numeric NOT NULL,
        longitude numeric NOT NULL,
        operator VARCHAR(2) NOT NULL,
        postcode VARCHAR NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );`);
		})
		.then(() => {
			const insertStationsQueryStr = format(
				'INSERT INTO stations (crs, name, classification, latitude, longitude, operator, postcode) VALUES %L returning *;',
				values(data)
			);
			return db.query(insertStationsQueryStr);
		});
};
