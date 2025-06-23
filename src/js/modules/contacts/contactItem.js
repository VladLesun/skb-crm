import { contactIcons } from './contactIcons';

export const contactItem = contacts =>
	contacts.map(({ type, value }) => {
		const contactItem = document.createElement('li'),
			contactLink = document.createElement('a');

		let contactHref = null;
		// let contactType = null;

		switch (type) {
			case 'phone':
				contactHref = `tel:${value}`;
				// contactType = 'Телефон';
				break;

			case 'email':
				contactHref = `mailto:${value}`;
				// contactType = 'Email';
				break;

			case 'facebook':
				contactHref = `https://www.facebook.com/:${value}`;
				// contactType = 'Facebook';
				break;

			case 'vk':
				contactHref = `https://vk.com/:${value}`;
				// contactType = 'VK';
				break;

			default:
				contactHref = value;
				// contactType = 'Другое';
				break;
		}

		contactLink.className = 'block';
		contactLink.href = contactHref;
		contactLink.innerHTML = contactIcons[type];

		contactItem.append(contactLink);

		return contactItem;
	});
