import { fio } from './fio';

export const appendFio = clients =>
	clients.map(client => ({
		...client,
		fio: fio(client),
	}));
