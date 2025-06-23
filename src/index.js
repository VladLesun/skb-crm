import { createAddModal } from './js/creators/createModals';
import { renderClientList } from './js/renderClient/renderClient';
import { renderMobileClientList } from './js/renderClient/renderMobileClientList';
import { getClients } from './js/servers/servers';
import { addClientBtnNode } from './js/vars/const';

const init = async () => {
	const clientData = await getClients('/clients');

	renderMobileClientList(clientData);
	renderClientList(clientData);

	addClientBtnNode.addEventListener('click', () => {
		document.body.append(createAddModal());
	});
};

init();
