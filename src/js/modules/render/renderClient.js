import { clientListNode } from '../../vars/const';
import { createClientItems } from '../creators/createClientItems';

export const renderClient = clientData => {
	let copyClientData = [...clientData];

	clientListNode.innerHTML = '';

	const clientList = document.createElement('ul');
	const clientItems = createClientItems(copyClientData);

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
