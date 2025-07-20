import { hidePreloader, showPreloader } from '../utils/preloader';

const API_URL = 'http://localhost:3000';

export const getClients = async () => {
	showPreloader('js-preloader-list');

	try {
		const res = await fetch(`${API_URL}/api/clients`);

		if (!res.ok) {
			throw new Error('Не удалось получить данные с сервера...');
		}

		return await res.json();
	} catch (error) {
		console.error(error.message);
	} finally {
		hidePreloader('js-preloader-list');
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

		error.errors = errorBody;

		throw error;
	}

	return await res.json();
};

export const removeClient = async id => {
	const res = await fetch(`${API_URL}/api/clients/${id}`, {
		method: 'DELETE',
	});

	if (!res.ok) {
		throw new Error('Не удалось удалить клиента...');
	}

	return await res.json();
};

export const changeClient = async (id, data) => {
	const res = await fetch(`${API_URL}/api/clients/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	if (!res.ok) {
		const errorBody = await res.json();
		const error = new Error('Не удалось изменить данные клиента...');

		error.errors = errorBody;

		throw error;
	}

	return await res.json();
};

export const searchClient = async data => {
	showPreloader('js-preloader-list');
	console.log('showPreloader: ', showPreloader);

	try {
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
		hidePreloader('js-preloader-list');
	}
};
