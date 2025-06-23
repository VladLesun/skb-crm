import { desktopClientItems } from '../modules/clients/desktopClientItems';
import { clientListNode } from '../vars/const';

export const renderClientList = clientData => {
	clientListNode.innerHTML = '';
	const clientItems = desktopClientItems(clientData);
	clientListNode.append(...clientItems);
};
