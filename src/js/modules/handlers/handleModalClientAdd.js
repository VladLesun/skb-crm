import { createModalsWithForm } from '../../creators/createModals';
import { renderClientList } from '../../renderClient/renderClient';
import { renderMobileClientList } from '../../renderClient/renderMobileClientList';
import { addClient, getClients } from '../../servers/servers';

export const handleModalClientAdd = () => {
	const onSave = async (formData, modalElement) => {
		// .disabled = true;

		try {
			await addClient(formData);
			const updatedClientList = await getClients();

			renderMobileClientList(updatedClientList);
			renderClientList(updatedClientList);

			modalElement.remove();
		} catch (error) {
			console.log(
				'error: ',
				error.errors.errors.forEach(({ field, message }) => {
					console.warn(`Ошибка в поле "${field}": ${message}`);
				})
			);
			return;
		} finally {
			// .disabled = false;
		}
	};

	const onClose = modalElement => {
		modalElement.remove();
	};

	document.body.append(createModalsWithForm({ onSave, onClose }));
};
