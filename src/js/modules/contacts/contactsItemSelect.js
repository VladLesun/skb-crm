import choicesMin from '../../vars/choices.min';

export const contactsItemSelect = (type, value) => {
	const contactsItem = document.createElement('li'),
		contactsSelect = document.createElement('select'),
		contactsOptionPhone = document.createElement('option'),
		contactsOptionEmail = document.createElement('option'),
		contactsOptionFacebook = document.createElement('option'),
		contactsOptionVk = document.createElement('option'),
		contactsOptionOther = document.createElement('option'),
		contactsInput = document.createElement('input'),
		contactsRemove = document.createElement('button');

	contactsItem.className = 'relative flex items-center bg-neutral-300/60';
	contactsSelect.className = 'js-choice';
	contactsInput.className =
		'w-full h-[37px] px-1 border-t border-b border-r solid border-[#c8c5d1] bg-neutral-100';
	contactsRemove.className =
		'absolute top-0 right-0 w-[27px] h-[37px] flex items-center justify-center bg-[#e7e5eb] text-[#B0B0B0] border solid border-[#c8c5d1] shrink-0 hidden';

	contactsInput.type = 'number';
	contactsInput.placeholder = 'Введите данные';

	contactsRemove.type = 'button';
	contactsRemove.innerHTML = `
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z"
			/>
		</svg>
	`;

	contactsOptionPhone.value = 'phone';
	contactsOptionEmail.value = 'email';
	contactsOptionFacebook.value = 'vk';
	contactsOptionVk.value = 'facebook';
	contactsOptionOther.value = 'other';

	contactsOptionPhone.innerText = 'Телефон';
	contactsOptionEmail.innerText = 'Email';
	contactsOptionFacebook.innerText = 'VK';
	contactsOptionVk.innerText = 'facebook';
	contactsOptionOther.innerText = 'other';

	contactsSelect.addEventListener('change', () => {
		switch (contactsSelect.value) {
			case 'email':
				contactsInput.type = 'email';
				break;

			case 'phone':
				contactsInput.type = 'number';
				break;

			default:
				contactsInput.type = 'text';
				break;
		}
	});

	contactsInput.addEventListener('input', () => {
		if (contactsInput.value.trim() !== '') {
			contactsRemove.classList.remove('hidden');
		} else {
			contactsRemove.classList.add('hidden');
		}
	});

	contactsRemove.addEventListener('click', () => {
		contactsItem.remove();

		if (
			document.getElementById('contactsWrap').getElementsByTagName('li')
				.length < 10
		) {
			document.getElementById('contactsAdd').classList.remove('hidden');
		}

		if (
			document.getElementById('contactsWrap').getElementsByTagName('li')
				.length === 0
		) {
			document.getElementById('contactsWrap').classList.remove('py-6');
			document.getElementById('contactsList').classList.add('hidden');
			document.getElementById('contactsList').classList.remove('flex');
		}
	});

	contactsSelect.append(
		contactsOptionPhone,
		contactsOptionEmail,
		contactsOptionFacebook,
		contactsOptionVk,
		contactsOptionOther
	);
	contactsItem.append(contactsSelect, contactsInput, contactsRemove);

	if (type) {
		contactsSelect.value = type;
	}

	if (value) {
		contactsInput.type = type;
		contactsInput.value = value;
	}

	new choicesMin(contactsSelect, {
		searchEnabled: false,
		itemSelectText: '',
	});

	return contactsItem;
};
