const API_URL = 'http://localhost:3000';

export const getClients = async url => {
	try {
		const res = await fetch(`${API_URL}/api${url}`);

		if (!res.ok) {
			throw new Error('Не удалось получить данные с сервера...');
		}

		return await res.json();
	} catch (error) {
		console.error(error.message);
	}
};
