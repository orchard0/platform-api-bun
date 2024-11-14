import { Elysia } from 'elysia';
import { serviceData } from './mcv/network.js';
import {
	searchStationByCRS,
	searchStationByTerm,
} from './mcv/stationSearch.controller.js';
const app = new Elysia({ prefix: '/api' });

app.onTransform(({ body, params, path, request }) => {
	console.log(`${request.method} ${path}`, {
		body: body || 'empty',
		params,
	});
});

//check if data is from the correct cors
//
app.get('/services/live/:from/:to', ({ params: { from, to } }) => {
	return serviceData(from, to);
});

app.get('/stations/:term', ({ params: { term } }) => {
	return searchStationByTerm(term);
});

app.get('/stations/crs/:crs', ({ params: { crs } }) => {
	return searchStationByCRS(crs);
});

app.listen(4000);

console.log(
	`Server is running at http://${app.server?.hostname}:${app.server?.port}`
);
