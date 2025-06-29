export const contactsAdd = contactsList => {
	const contactsArr = [];
	const contacts = contactsList.childNodes;
	for (let contact of contacts) {
		contactsArr.push({
			type: contact.querySelector('select').value,
			value: contact.querySelector('input').value,
		});
	}

	return contactsArr;
};
