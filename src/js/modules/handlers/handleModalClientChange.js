import { createModalsWithForm } from '../../creators/createModals';
import { renderClientList } from '../../renderClient/renderClient';
import { renderMobileClientList } from '../../renderClient/renderMobileClientList';
import { changeClient, getClients } from '../../servers/servers';

export const handleModalClientChange = client => {
	const onSave = async (formData, modalElement) => {
		await changeClient(client.id, formData);

		let newClientList = await getClients();

		renderMobileClientList(newClientList);
		renderClientList(newClientList);

		modalElement.remove();
	};

	const onClose = modalElement => {
		modalElement.remove();
	};

	document.body.append(createModalsWithForm({ onSave, onClose }, client));
};
