import { queryStationNames, queryStationCrs } from './stationSearch.model';

export const searchStationByTerm = async (search) => {
	try {
		const stations = await queryStationNames(search);
		return { stations };
	} catch {
		throw new Error('Station search error!');
	}
};

export const searchStationByCRS = async (search) => {
	try {
		const stations = await queryStationCrs(search);
		return { stations };
	} catch {
		throw new Error('CRS search error!');
	}
};
