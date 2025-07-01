import { contactIcons } from './contactIcons';

export const contactItem = contacts =>
	contacts.map(({ type, value }) => {
		const contactItem = document.createElement('li'),
			contactLink = document.createElement('a');

		let contactHref = null;

		switch (type) {
			case 'phone':
				contactHref = `tel:${value}`;
				break;

			case 'email':
				contactHref = `mailto:${value}`;
				break;

			case 'facebook':
				contactHref = `https://www.facebook.com/${value}`;
				break;

			case 'vk':
				contactHref = `https://vk.com/${value}`;
				break;

			default:
				contactHref = value;
				break;
		}

		contactLink.className = 'block';
		contactLink.href = contactHref;
		contactLink.target = '_blank';
		contactLink.innerHTML = contactIcons[type];

		contactItem.append(contactLink);

		return contactItem;
	});
