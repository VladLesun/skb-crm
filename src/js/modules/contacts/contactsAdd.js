export const contactsAdd = contactsList => {
	const contactsArr = [];
	const contacts = contactsList.childNodes;

	contacts.forEach(contact => {
		contactsArr.push({
			type: contact.querySelector('select').value,
			value: contact.querySelector('input').value,
		});
	});

	return contactsArr;
};
