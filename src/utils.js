export const genDatetime = () => {
	const currentDateTime = new Date();
	return new Intl.DateTimeFormat('sv', {
		timeZone: 'Europe/London',
		timeStyle: 'medium',
		dateStyle: 'short',
	})
		.format(currentDateTime)
		.replace(' ', 'T')
		.replaceAll(':', '')
		.replaceAll('-', '');
};
