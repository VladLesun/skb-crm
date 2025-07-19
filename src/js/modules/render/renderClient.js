import { clientListNode } from '../../vars/const';
import { createClientItems } from '../creators/createClientItems';

export const renderClient = clientData => {
	let copyClientData = [...clientData];

	clientListNode.innerHTML = '';

	const clientList = document.createElement('ul');
	const clientItems = createClientItems(copyClientData);

	if (clientItems.length === 0) {
		clientListNode.innerHTML = `<p class="absolute top-1/2 left-1/2  translate-[-50%]">Здесь нет клиентов, скорее добавьте нового клиента...</p>`;
	}

	if (window.innerWidth < 767) {
		clientList.className = 'overflow-y-auto h-70';
		clientList.append(...clientItems);
		clientListNode.append(clientList);
	} else {
		if (clientItems.length === 0) {
			clientList.className = 'block';
		} else {
			clientList.className = 'block mb-40';
		}

		clientList.append(...clientItems);
		clientListNode.append(clientList);
	}
};
