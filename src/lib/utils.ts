export function getQueryParameters(url: string | null | undefined): Record<string, string> {
	const queryParams: Record<string, string> = {};

	if (!url) {
		// If url is null or undefined, return an empty object
		return queryParams;
	}

	try {
		const params = new URL(url).searchParams;
		params.forEach((value, key) => {
			queryParams[key] = value;
		});
	} catch (e) {
		console.error('Invalid URL:', e);
	}

	return queryParams;
}

export function formatDate(isoDateString: string) {
	const date = new Date(isoDateString);

	const month = date.getMonth() + 1; // getMonth() returns 0-based index
	const day = date.getDate();
	const year = date.getFullYear();

	let hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? 'PM' : 'AM';

	// Convert hours from 24-hour to 12-hour format
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'

	// Zero padding for minutes
	const paddedMinutes = minutes < 10 ? '0' + minutes : minutes;

	// Format: MM/DD/YYYY HH:MM AM/PM
	return `${month}/${day}/${year} ${hours}:${paddedMinutes} ${ampm}`;
}
