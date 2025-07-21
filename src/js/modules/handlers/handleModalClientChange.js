import { createModalsWithForm } from '../creators/createModals';
import { renderClient } from '../render/renderClient';
import { changeClient, getClients } from '../servers/servers';
import { hidePreloader, showPreloader } from '../utils/preloader';
import { showClientErrors } from '../utils/showClientErrors';
import { showServerErrors } from '../utils/showServerErrors';
import { validateClientData, validateContacts } from '../utils/validateClient';

export const handleModalClientChange = client => {
	const onSave = async (formData, modalElement, sendBtn) => {
		const localErrors = [
			...validateClientData(formData),
			...validateContacts(formData.contacts),
		];

		if (localErrors.length > 0) {
			showClientErrors(localErrors);
			return;
		}

		sendBtn.disabled = true;
		showPreloader('js-preloader-btn');

		try {
			await changeClient(client.id, formData);

			const updateClients = await getClients();

			renderClient(updateClients);

			modalElement.remove();
		} catch (error) {
			showServerErrors(error);
		} finally {
			sendBtn.disabled = false;
			hidePreloader('js-preloader-btn');
		}
	};

	const onClose = modalElement => {
		modalElement.remove();
	};

	document.body.append(createModalsWithForm({ onSave, onClose }, client));
};
