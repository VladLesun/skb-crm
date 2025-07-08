const API_URL = 'http://localhost:3000';

export const getClients = async () => {
	try {
		// showLoader()

		const res = await fetch(`${API_URL}/api/clients`);

		if (!res.ok) {
			throw new Error('Не удалось получить данные с сервера...');
		}

		return await res.json();
	} catch (error) {
		console.error(error.message);
	} finally {
		// hideLoader()
	}
};

export const addClient = async data => {
	const res = await fetch(`${API_URL}/api/clients`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		const errorBody = await res.json();
		const error = new Error('Не удалось отправить данные на сервер...');

		if (Array.isArray(errorBody.errors)) {
			error.errors = errorBody;
		}

		throw error;
	}

	return await res.json();
};

export const removeClient = async id => {
	try {
		// showLoader()

		const res = await fetch(`${API_URL}/api/clients/${id}`, {
			method: 'DELETE',
		});

		if (!res.ok) {
			throw new Error('Не удалось удалить клиента...');
		}

		return await res.json();
	} catch (error) {
		console.error(error.message);
	} finally {
		// hideLoader()
	}
};

export const changeClient = async (id, data) => {
	try {
		// showLoader()

		const res = await fetch(`${API_URL}/api/clients/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		if (!res.ok) {
			throw new Error('Не удалось изменить данные клиента...');
		}

		return await res.json();
	} catch (error) {
		console.error(error.message);
	} finally {
		// hideLoader()
	}
};

export const searchClient = async data => {
	try {
		// showLoader()

		const ids = data.map(client => parseInt(client.id));
		const results = await Promise.all(
			ids.map(async id => {
				const res = await fetch(`${API_URL}/api/clients/${id}`);

				if (!res.ok) {
					throw new Error('Не удалось найти клиента...');
				}

				return await res.json();
			})
		);

		return results;
	} catch (error) {
		console.error(error.message);
		return [];
	} finally {
		// hideLoader()
	}
};
