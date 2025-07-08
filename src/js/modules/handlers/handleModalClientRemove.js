import { clientList } from '../../..';
import { createModalsWithForm } from '../../creators/createModals';
import { renderClientList } from '../../renderClient/renderClient';
import { renderMobileClientList } from '../../renderClient/renderMobileClientList';
import { removeClient } from '../../servers/servers';

export const handleModalClientRemove = id => {
	const onSave = async (id, modalElement) => {
		await removeClient(id);
		const newClientList = clientList.filter(client => client.id !== id);
		renderClientList(newClientList);
		renderMobileClientList(newClientList);
		modalElement.remove();
	};

	const onClose = modalElement => {
		modalElement.remove();
	};

	document.body.append(createModalsWithForm({ onSave, onClose }, id));
};
