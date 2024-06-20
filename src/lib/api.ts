export async function apiGet<T>(url: string, options: RequestInit = {}): Promise<T> {
	try {
		const response = await fetch(url, {
			...options,
			method: 'GET'
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error('API GET request failed:', error);
		throw error;
	}
}
