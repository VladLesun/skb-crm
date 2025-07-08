import { clientList } from '../../..';
import { createModalsWithForm } from '../../creators/createModals';
import { renderClientList } from '../../renderClient/renderClient';
import { renderMobileClientList } from '../../renderClient/renderMobileClientList';
import { addClient, getClients } from '../../servers/servers';

export const handleModalClientAdd = () => {
	const onSave = async (formData, modalElement) => {
		const newClient = await addClient(formData);
		let newClientList = clientList.push(newClient);

		newClientList = await getClients();
		renderMobileClientList(newClientList);
		renderClientList(newClientList);

		modalElement.remove();
	};

	const onClose = modalElement => {
		modalElement.remove();
	};

	document.body.append(createModalsWithForm({ onSave, onClose }));
};
