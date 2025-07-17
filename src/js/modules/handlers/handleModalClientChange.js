import { createModalsWithForm } from '../../creators/createModals';
import { renderClientList } from '../../renderClient/renderClient';
import { renderMobileClientList } from '../../renderClient/renderMobileClientList';
import { changeClient, getClients } from '../../servers/servers';
import { showClientErrors } from '../../utils/showClientErrors';
import { showServerErrors } from '../../utils/showServerErrors';
import {
	validateClientData,
	validateContacts,
} from '../../utils/validateClient';

export const handleModalClientChange = client => {
	// .disabled = true;

	const onSave = async (formData, modalElement) => {
		const localErrors = [
			...validateClientData(formData),
			...validateContacts(formData.contacts),
		];

		if (localErrors.length > 0) {
			showClientErrors(localErrors);
			return;
		}

		try {
			await changeClient(client.id, formData);

			const updateClientList = await getClients();

			renderMobileClientList(updateClientList);
			renderClientList(updateClientList);

			modalElement.remove();
		} catch (error) {
			showServerErrors(error);
		} finally {
			// .disabled = false;
		}
	};

	const onClose = modalElement => {
		modalElement.remove();
	};

	document.body.append(createModalsWithForm({ onSave, onClose }, client));
};
