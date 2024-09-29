export const genDatetime = () => {
	return new Date()
		.toLocaleString('sv')
		.replace(' ', 'T')
		.replaceAll(':', '')
		.replaceAll('-', '');
};
