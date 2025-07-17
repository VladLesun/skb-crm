import { fio } from '../../utils/fio';
import { formatDate } from '../../utils/formatDate';
import { formatTime } from '../../utils/formatTime';
import { contactItem } from '../contacts/contactItem';
import { handleModalClientChange } from '../handlers/handleModalClientChange';
import { handleModalClientRemove } from '../handlers/handleModalClientRemove';

const MAX_CONTACTS = 5;

export const desktopClientItems = clientData =>
	clientData.map(client => {
		const { id, name, surname, lastName, contacts, createdAt, updatedAt } =
			client;
		const item = document.createElement('li'),
			itemIdWrap = document.createElement('div'),
			itemId = document.createElement('p'),
			itemNameWrap = document.createElement('div'),
			itemName = document.createElement('p'),
			itemCreateAtWrap = document.createElement('div'),
			itemCreateAtDate = document.createElement('p'),
			itemCreateAtTime = document.createElement('p'),
			itemUpdateAtWrap = document.createElement('div'),
			itemUpdateAtDate = document.createElement('p'),
			itemUpdateAtTime = document.createElement('p'),
			itemContactsList = document.createElement('ul'),
			itemContactsItems = contactItem(contacts),
			itemActions = document.createElement('div'),
			itemActionChangeBtn = document.createElement('button'),
			itemActionRemoveBtn = document.createElement('button');

		item.className =
			'h-15 grid grid-cols-[80px_218px_98px_98px_129px_auto] md:gap-1 lg:grid-cols-[90px_234px_152px_152px_148px_auto] border-b solid border-neutral-300';
		itemIdWrap.className = 'flex items-center justify-center';
		itemId.className = 'px-2.5 text-xs text-center break-all text-neutral-300';
		itemNameWrap.className = 'flex items-center justify-start';
		itemName.className = 'text-[14px]';
		itemCreateAtWrap.className =
			'flex flex-col items-center justify-center lg:flex-row lg:justify-start lg:gap-2.5';
		itemCreateAtDate.className = 'text-[14px] md:self-start lg:self-center';
		itemCreateAtTime.className =
			'text-[14px] text-neutral-300 md:self-start lg:self-center';
		itemUpdateAtWrap.className =
			'flex flex-col items-center justify-center lg:flex-row lg:justify-start lg:gap-2.5';
		itemUpdateAtDate.className = 'text-[14px] md:self-start lg:self-center';
		itemUpdateAtTime.className =
			'text-[14px] text-neutral-300 md:self-start lg:self-center';
		itemContactsList.className =
			'w-[140px] flex flex-wrap items-center justify-start gap-x-2.5';
		itemActions.className =
			'flex flex-col items-center justify-center gap-1 lg:flex-row lg:justify-start lg:gap-3';
		itemActionChangeBtn.className =
			'flex items-center text-[14px] md:self-start lg:self-center';
		itemActionRemoveBtn.className =
			'flex items-center text-[14px] md:self-start lg:self-center';

		itemId.innerText = id;
		itemName.innerText = fio(client);
		itemCreateAtDate.innerText = formatDate(createdAt);
		itemCreateAtTime.innerText = formatTime(createdAt);
		itemUpdateAtDate.innerText = formatDate(updatedAt);
		itemUpdateAtTime.innerText = formatTime(updatedAt);
		itemActionChangeBtn.innerHTML = `
			<svg
				width='16'
				height='16'
				viewBox='0 0 16 16'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M2 11.5002V14.0002H4.5L11.8733 6.62687L9.37333 4.12687L2 11.5002ZM13.8067 4.69354C14.0667 4.43354 14.0667 4.01354 13.8067 3.75354L12.2467 2.19354C11.9867 1.93354 11.5667 1.93354 11.3067 2.19354L10.0867 3.41354L12.5867 5.91354L13.8067 4.69354Z'
					fill='#9873FF'
				/>
			</svg>
			Изменить
		`;
		itemActionRemoveBtn.innerHTML = `
			<svg
				width='16'
				height='16'
				viewBox='0 0 16 16'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z'
					fill='#F06A4D'
				/>
			</svg>
			Удалить
		`;

		let visibleContactLinks = [],
			hiddenContactLinks = [];

		if (itemContactsItems.length === MAX_CONTACTS) {
			visibleContactLinks = itemContactsItems;
		} else if (itemContactsItems.length > MAX_CONTACTS) {
			visibleContactLinks = itemContactsItems.slice(0, MAX_CONTACTS - 1);
			hiddenContactLinks = itemContactsItems.slice(MAX_CONTACTS - 1);
		}

		if (hiddenContactLinks.length > 0) {
			const contactsMoreBtn = document.createElement('button');
			contactsMoreBtn.className =
				'w-4 h-4 text-[8px] border solid border-violet-500 rounded-[50%]';
			contactsMoreBtn.innerText = `+${hiddenContactLinks.length}`;

			contactsMoreBtn.addEventListener('click', () => {
				contactsMoreBtn.remove();
				itemContactsList.append(...hiddenContactLinks);
			});

			visibleContactLinks.push(contactsMoreBtn);
		}

		document.body.addEventListener('click', ({ target }) => {
			if (target === itemActionChangeBtn) {
				handleModalClientChange(client);
			}

			if (target === itemActionRemoveBtn) {
				handleModalClientRemove(id);
			}
		});

		itemIdWrap.append(itemId);
		itemNameWrap.append(itemName);
		itemCreateAtWrap.append(itemCreateAtDate, itemCreateAtTime);
		itemUpdateAtWrap.append(itemUpdateAtDate, itemUpdateAtTime);
		itemContactsList.append(...visibleContactLinks);
		itemActions.append(itemActionChangeBtn, itemActionRemoveBtn);
		item.append(
			itemIdWrap,
			itemNameWrap,
			itemCreateAtWrap,
			itemUpdateAtWrap,
			itemContactsList,
			itemActions
		);

		return item;
	});
