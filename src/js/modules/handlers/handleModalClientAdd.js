import { createModalsWithForm } from '../creators/createModals';
import { renderClient } from '../render/renderClient';
import { addClient, getClients } from '../servers/servers';
import { showClientErrors } from '../utils/showClientErrors';
import { showServerErrors } from '../utils/showServerErrors';
import { validateClientData, validateContacts } from '../utils/validateClient';

export const handleModalClientAdd = () => {
	const onSave = async (formData, modalElement) => {
		const localErrors = [
			...validateClientData(formData),
			...validateContacts(formData.contacts),
		];

		if (localErrors.length > 0) {
			showClientErrors(localErrors);
			return;
		}
		// .disabled = true;

		try {
			await addClient(formData);

			const updatedClientList = await getClients();

			renderClient(updatedClientList);

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

	document.body.append(createModalsWithForm({ onSave, onClose }));
};
