import { desktopClientItems } from '../modules/clients/desktopClientItems';
import { clientListNode } from '../vars/const';

export const renderClientList = clientData => {
	let copyClientData = [...clientData];

	clientListNode.innerHTML = '';

	const clientItems = desktopClientItems(copyClientData);
	clientListNode.append(...clientItems);
};
