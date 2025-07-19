const onlyLettersRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[0-9\s\-().]{7,}$/;

export const validateClientData = ({ name, surname, lastName }) => {
	const errors = [];

	if (!name || !onlyLettersRegex.test(name.trim())) {
		errors.push({
			field: 'name',
			message: 'Имя обязательно и должно содержать только буквы',
		});
	}

	if (!surname || !onlyLettersRegex.test(surname.trim())) {
		errors.push({
			field: 'surname',
			message: 'Фамилия обязательна и должна содержать только буквы',
		});
	}

	// if (!onlyLettersRegex.test(lastName)) {
	// 	errors.push({
	// 		field: 'lastName',
	// 		message: 'Отчество должно содержать только буквы',
	// 	});
	// }

	return errors;
};

export const validateContacts = contacts => {
	const errors = [];

	contacts.forEach(({ type, value }, index) => {
		const trimmed = value.trim();

		if (!trimmed) {
			errors.push({
				field: `contacts[${index}].value`,
				message: 'Контакт не может быть пустым',
			});
			return;
		}

		if (type === 'email' && !emailRegex.test(trimmed)) {
			errors.push({
				field: `contacts[${index}].value`,
				message: 'Введите корректный Email',
			});
		}

		if (type === 'phone' && !phoneRegex.test(trimmed)) {
			errors.push({
				field: `contacts[${index}].value`,
				message: 'Введите корректный номер телефона',
			});
		}
	});

	return errors;
};
