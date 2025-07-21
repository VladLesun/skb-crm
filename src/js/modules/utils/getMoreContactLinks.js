const MAX_CONTACTS = 5;

export const getMoreContactLinks = (contactItems, btnParentElement) => {
	const visibleLinks = [],
		hiddenLinks = [];

	if (contactItems.length <= MAX_CONTACTS) {
		return contactItems;
	}

	visibleLinks.push(...contactItems.slice(0, MAX_CONTACTS - 1));
	hiddenLinks.push(...contactItems.slice(MAX_CONTACTS - 1));

	const contactsMoreBtn = document.createElement('button');
	contactsMoreBtn.className =
		'w-4 h-4 text-[8px] border solid border-violet-500 rounded-[50%]';
	contactsMoreBtn.innerText = `+${hiddenLinks.length}`;

	contactsMoreBtn.addEventListener('click', () => {
		contactsMoreBtn.remove();
		btnParentElement.append(...hiddenLinks);
		hiddenLinks.forEach(link => {
			link.classList.add('hidden-contact');
			setTimeout(() => link.classList.add('show'), 10);
		});
	});

	visibleLinks.push(contactsMoreBtn);

	return visibleLinks;
};
