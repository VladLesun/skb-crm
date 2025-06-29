import { contactsAdd } from '../modules/contacts/contactsAdd';
import { contactsItemSelect } from '../modules/contacts/contactsItemSelect';
import { createInput } from './createInput';

//! в будущем переделать на одну функцию для всех модалок
export const createAddModal = ({ onSave, onClose }) => {
	const modal = document.createElement('div'),
		modalOverlay = document.createElement('div'),
		modalClose = document.createElement('button'),
		modalForm = document.createElement('form'),
		formTitle = document.createElement('h2'),
		formWrapInputs = document.createElement('div'),
		formInputSurname = createInput('surname', 'Фамилия*'),
		formInputName = createInput('name', 'Имя*'),
		formInputLastName = createInput('middleName', 'Отчество'),
		formWrapContacts = document.createElement('div'),
		formContactsList = document.createElement('ul'),
		formContactsAdd = document.createElement('button'),
		formWrapActions = document.createElement('div'),
		formSaveBtn = document.createElement('button'),
		formCancelBtn = document.createElement('button');

	modal.className =
		'w-full h-full fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center transition-opacity duration-300 ease-in-out overflow-hidden';
	modalOverlay.className =
		'fixed w-75 max-h-[90vh] bg-white md:w-112.5 overflow-y-auto';
	modalForm.className = 'py-6';
	formTitle.className = 'ml-3.75 mb-8 text-lg font-bold md:ml-7.5';
	formWrapInputs.className = 'flex flex-col gap-8 mb-6 px-3.75 md:px-7.5';
	formWrapContacts.className = 'flex flex-col items-center mb-6 bg-neutral-200';
	formContactsList.className =
		'w-full flex-col gap-3.75 mb-6 px-3.75 md:px-7.5 hidden';
	formContactsAdd.className =
		'w-40 h-9 flex items-center justify-center gap-1 text-[14px]';
	formWrapActions.className = 'flex flex-col items-center justify-center';
	formSaveBtn.className =
		'w-37 h-11 mb-1 bg-violet-500 text-white text-base font-[600]';
	formCancelBtn.className = 'underline text-xs text-neutral-500';
	modalClose.className =
		'modalClose absolute z-10 top-1 right-1 size-7 flex items-center justify-center text-neutral-500 md:top-4 md:right-4';

	formWrapContacts.id = 'contactsWrap';
	formContactsList.id = 'contactsList';
	formContactsAdd.id = 'contactsAdd';

	formTitle.innerText = 'Новый клиент';
	formContactsAdd.innerHTML = `
		<svg
			class='text-violet-500'
			width='16'
			height='16'
			viewBox='0 0 16 16'
			fill='currentColor'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='M7.99992 4.66659C7.63325 4.66659 7.33325 4.96659 7.33325 5.33325V7.33325H5.33325C4.96659 7.33325 4.66659 7.63325 4.66659 7.99992C4.66659 8.36659 4.96659 8.66659 5.33325 8.66659H7.33325V10.6666C7.33325 11.0333 7.63325 11.3333 7.99992 11.3333C8.36659 11.3333 8.66659 11.0333 8.66659 10.6666V8.66659H10.6666C11.0333 8.66659 11.3333 8.36659 11.3333 7.99992C11.3333 7.63325 11.0333 7.33325 10.6666 7.33325H8.66659V5.33325C8.66659 4.96659 8.36659 4.66659 7.99992 4.66659ZM7.99992 1.33325C4.31992 1.33325 1.33325 4.31992 1.33325 7.99992C1.33325 11.6799 4.31992 14.6666 7.99992 14.6666C11.6799 14.6666 14.6666 11.6799 14.6666 7.99992C14.6666 4.31992 11.6799 1.33325 7.99992 1.33325ZM7.99992 13.3333C5.05992 13.3333 2.66659 10.9399 2.66659 7.99992C2.66659 5.05992 5.05992 2.66659 7.99992 2.66659C10.9399 2.66659 13.3333 5.05992 13.3333 7.99992C13.3333 10.9399 10.9399 13.3333 7.99992 13.3333Z' />
		</svg>
		Добавить контакт
	`;
	formSaveBtn.innerText = 'Сохранить';
	formCancelBtn.innerText = 'Отмена';
	modalClose.innerHTML = `
		<svg
			width='17'
			height='17'
			viewBox='0 0 17 17'
			fill='currentColor'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M16.2333 1.73333L15.2667 0.766664L8.49997 7.53336L1.7333 0.766696L0.766637 1.73336L7.5333 8.50003L0.766664 15.2667L1.73333 16.2333L8.49997 9.46669L15.2666 16.2334L16.2333 15.2667L9.46663 8.50003L16.2333 1.73333Z'
			/>
		</svg>
	`;

	formContactsAdd.type = 'button';
	formSaveBtn.type = 'submit';
	formCancelBtn.type = 'button';
	modalClose.type = 'button';

	//! скрывать пустой лист с контактами

	formContactsAdd.addEventListener('click', () => {
		formContactsList.append(contactsItemSelect());

		if (formContactsList.getElementsByTagName('li').length > 9) {
			formContactsAdd.classList.add('hidden');
			return;
		}

		if (formContactsList.getElementsByTagName('li').length > 0) {
			formWrapContacts.classList.add('py-6');
			formContactsList.classList.remove('hidden');
			formContactsList.classList.add('flex');
		}
	});

	modalForm.addEventListener('submit', e => {
		e.preventDefault();

		const formData = {
			surname: formInputSurname.value.trim(),
			name: formInputName.value.trim(),
			lastName: formInputLastName.value.trim(),
			contacts: contactsAdd(formContactsList),
		};

		onSave(formData, modal);
		console.log('Форма отправлена');
	});

	document.body.addEventListener('click', ({ target }) => {
		if (target.closest('.modalClose') || target === formCancelBtn) {
			onClose(modal);
		}

		if (target === modal && target !== modalOverlay) {
			onClose(modal);
		}
	});

	formWrapInputs.append(formInputSurname, formInputName, formInputLastName);
	formWrapContacts.append(formContactsList, formContactsAdd);
	formWrapActions.append(formSaveBtn, formCancelBtn);
	modalForm.append(
		formTitle,
		formWrapInputs,
		formWrapContacts,
		formWrapActions
	);
	modalOverlay.append(modalForm, modalClose);
	modal.append(modalOverlay);

	return modal;
};
