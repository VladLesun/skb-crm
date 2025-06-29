import { createAddModal } from './js/creators/createModals';
import { renderClientList } from './js/renderClient/renderClient';
import { renderMobileClientList } from './js/renderClient/renderMobileClientList';
import { addClient, getClients } from './js/servers/servers';
import { addClientBtnNode } from './js/vars/const';

let clientData = [];

const init = async () => {
	clientData = await getClients();

	renderMobileClientList(clientData);
	renderClientList(clientData);

	const onSave = async (formData, modalElement) => {
		const newClient = await addClient(formData);
		clientData.push(newClient);

		clientData = await getClients();
		renderMobileClientList(clientData);
		renderClientList(clientData);

		modalElement.remove();
	};

	const onClose = modalElement => {
		modalElement.remove();
	};

	addClientBtnNode.addEventListener('click', () => {
		document.body.append(createAddModal({ onSave, onClose }));
	});
};

init();
