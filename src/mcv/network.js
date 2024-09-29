import { genDatetime } from '../utils';

export const serviceData = async (from, to) => {
	const fromCRS = from.toUpperCase();
	const toCRS = to.toUpperCase();
	const fastestData = await fetchFastest(fromCRS, toCRS);
	const nextData = await fetchNext(fromCRS, toCRS);
	const departuresData = await fetchDepartures(fromCRS, toCRS);

	// await Bun.write('./fastest.json'', JSON.stringify(fastestData));
	// await Bun.write('./next.json', JSON.stringify(nextData));
	// await Bun.write('./departures.json'', JSON.stringify(departuresData));

	// const fastestFile = Bun.file('./fastest.json', {
	// 	type: 'application/json',
	// });
	// const nextFile = Bun.file('next.json', { type: 'application/json' });
	// const departuresFile = Bun.file('./departures.json', {
	// 	type: 'application/json',
	// });
	// const fastestData = await fastestFile.json();
	// const nextData = await nextFile.json();
	// const departuresData = await departuresFile.json();

	const { nrccMessages, services: departuresDataP } =
		processDepartureData(departuresData);
	if (!departuresDataP) return { from, to, services: [] };
	const fastestDataP = processFastestNextData(fastestData);
	const nextDataP = processFastestNextData(nextData);

	// console.log(fastestDataP, nextDataP);

	const services = departuresDataP.map((item) => {
		const checkKeys = ['locationName', 'destination', 'via', 'std'];
		const type = [];

		if (
			fastestDataP[0] &&
			checkKeys.every((key) => {
				return item[key] == fastestDataP[0][key];
			})
		) {
			item.platform = fastestDataP[0].platform;
			type.push('fastest');
		}
		if (
			nextDataP[0] &&
			checkKeys.every((key) => {
				return item[key] == nextDataP[0][key];
			})
		) {
			item.platform = nextDataP[0].platform;
			type.push('next');
		}

		return { ...item, type };
	});

	return { from, to, generatedAt: genDatetime(), nrccMessages, services };
};
const fetchFastest = async (from, to) => {
	const url = process.env.api_url_fastest + `/${from}/${to}/${genDatetime()}`;
	const response = await fetch(url, {
		headers: {
			'x-apikey': process.env.api_key_fastest,
		},
	});

	const body = await response.json();
	return body;
};

const fetchNext = async (from, to) => {
	const url = process.env.api_url_next + `/${from}/${to}/${genDatetime()}`;
	const response = await fetch(url, {
		headers: {
			'x-apikey': process.env.api_key_next,
		},
	});

	const body = await response.json();
	return body;
};
const fetchDepartures = async (from, to) => {
	const url = process.env.api_url_departures + `/${from}?filterCrs=${to}`;
	const response = await fetch(url, {
		headers: {
			'x-apikey': process.env.api_key_departures,
		},
	});

	const body = await response.json();
	return body;
};

const processFastestNextData = (data) => {
	const { departures, locationName, nrccMessages, generatedAt } = data;
	const service = departures[0].service;
	if (!service) return {};
	const { isCancelled, platform, operator } = service;
	let { std, etd } = service;
	const { locationName: destination, via } = service.destination[0];

	// no etd is returned in the response if the train is delayed!
	if (!etd) etd = '-';
	etd = etd.slice(11, 16);
	std = std.slice(11, 16);
	if (etd == std) etd = 'On time';

	return [
		{
			// generatedAt,
			// nrccMessages,
			locationName,
			destination,
			via,
			std,
			// etd,
			platform,
			// isCancelled,
			// operator,
		},
	];
};

const processDepartureData = (data) => {
	const services = [];
	const { trainServices, locationName, nrccMessages, generatedAt } = data;
	if (!trainServices) return services;
	for (const departure of trainServices) {
		const {
			isCancelled,
			filterLocationCancelled = false,
			cancelReason,
			delayReason,
			platform,
			std,
			etd,
			operator,
		} = departure;
		const { locationName: destination, via } = departure.destination[0];
		const item = {
			// generatedAt,
			// nrccMessages,
			locationName,
			destination,
			via,
			std,
			etd,
			platform,
			isCancelled,
			operator,
			isCancelled: filterLocationCancelled,
			cancelReason,
			delayReason,
		};
		console.log(departure);
		services.push(item);
	}

	return { nrccMessages, services };
};
