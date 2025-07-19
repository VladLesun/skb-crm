import { clientList } from '../../..';
import { createModalsWithForm } from '../creators/createModals';
import { renderClient } from '../render/renderClient';
import { removeClient } from '../servers/servers';

export const handleModalClientRemove = id => {
	const onSave = async (id, modalElement) => {
		try {
			await removeClient(id);
			const newClientList = clientList.filter(client => client.id !== id);
			renderClient(newClientList);
			modalElement.remove();
		} catch (error) {
			console.warn(error.message);
		} finally {
		}
	};

	const onClose = modalElement => {
		modalElement.remove();
	};

	document.body.append(createModalsWithForm({ onSave, onClose }, id));
};
