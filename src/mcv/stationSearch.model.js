import db from '../../db/connections';
import format from 'pg-format';

export const queryStationNames = (slug) => {
	const query = format(
		"SELECT name, crs from stations where lower(name) like '%%%s%%' or lower(crs) like '%%%s%%' limit 10",
		slug.toLowerCase(),
		slug.toLowerCase()
	);
	return db.query(query).then(({ rows }) => {
		return rows;
	});
};

export const queryStationCrs = (crs) => {
	const query = format(
		'SELECT name, crs from stations where lower(crs) = %L',
		crs.toLowerCase()
	);
	return db.query(query).then(({ rows }) => {
		return rows;
	});
};
