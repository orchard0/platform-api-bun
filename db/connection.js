const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';

if (!process.env.PGDATABASE && !process.env.POSTGRES_URL) {
	throw new Error('PGDATABASE or POSTGRES_URL not set');
}
const config = {};

if (ENV === 'production') {
	config.connectionString = process.env.POSTGRES_URL;
	// config.ssl = { rejectUnauthorized: false };
}

module.exports = new Pool(config);
