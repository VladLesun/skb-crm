const API_URL = 'http://localhost:3000';

export const getClients = async () => {
	try {
		const res = await fetch(`${API_URL}/api/clients`);

		if (!res.ok) {
			throw new Error('Не удалось получить данные с сервера...');
		}

		return await res.json();
	} catch (error) {
		console.error(error.message);
	}
};

export const addClient = async data => {
	try {
		const res = await fetch(`${API_URL}/api/clients`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		if (!res.ok) {
			throw new Error('Не удалось отправить данные на сервер...');
		}

		return await res.json();
	} catch (error) {
		console.error(error.message);
	}
};
