import { contactIcons } from './contactIcons';

export const contactItem = contacts =>
	contacts.map(({ type, value }) => {
		const contactItem = document.createElement('li'),
			contactLink = document.createElement('a'),
			contactDesc = document.createElement('p');

		let contactHref = null,
			contactType = null;

		switch (type) {
			case 'phone':
				contactHref = `tel:${value}`;
				contactType = 'Телефон';
				break;

			case 'email':
				contactHref = `mailto:${value}`;
				contactType = 'Email';
				break;

			case 'facebook':
				contactHref = `https://www.facebook.com/${value}`;
				contactType = 'Facebook';
				break;

			case 'vk':
				contactHref = `https://vk.com/${value}`;
				contactType = 'VK';
				break;

			default:
				contactHref = `https://${value}`;
				contactType = 'Другая соц.сеть';
				break;
		}

		contactItem.className = 'relative';
		contactLink.className = 'block';
		contactDesc.className = 'contact-desc';

		contactLink.href = contactHref;
		contactLink.target = '_blank';

		contactLink.innerHTML = contactIcons[type];
		contactDesc.innerText = `${contactType}: ${value}`;

		contactLink.addEventListener('mouseenter', () => {
			contactDesc.classList.add('contact-desc_visible');
		});

		contactLink.addEventListener('mouseleave', () => {
			contactDesc.classList.remove('contact-desc_visible');
		});

		contactItem.append(contactLink, contactDesc);

		return contactItem;
	});
