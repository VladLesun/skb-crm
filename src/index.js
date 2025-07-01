import { createModalsWithForm } from './js/creators/createModals';
import { renderClientList } from './js/renderClient/renderClient';
import { renderMobileClientList } from './js/renderClient/renderMobileClientList';
import { addClient, getClients } from './js/servers/servers';
import { addClientBtnNode } from './js/vars/const';

export let clientList = [];

const init = async () => {
	const serverData = await getClients();

	if (serverData) {
		clientList = serverData;
	}

	renderMobileClientList(clientList);
	renderClientList(clientList);

	const handleModalClientAdd = () => {
		const onSave = async (formData, modalElement) => {
			const newClient = await addClient(formData);
			clientList.push(newClient);

			clientList = await getClients();
			renderMobileClientList(clientList);
			renderClientList(clientList);

			modalElement.remove();
		};

		const onClose = modalElement => {
			modalElement.remove();
		};

		document.body.append(createModalsWithForm({ onSave, onClose }));
	};

	addClientBtnNode.addEventListener('click', handleModalClientAdd);
};

init();
