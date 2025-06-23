import { mobileClientItems } from '../modules/clients/mobileClientItems';
import { mobileClientListNode } from '../vars/const';

export const renderMobileClientList = clientData => {
	mobileClientListNode.innerHTML = '';
	const clientItems = mobileClientItems(clientData);
	mobileClientListNode.append(...clientItems);
};
