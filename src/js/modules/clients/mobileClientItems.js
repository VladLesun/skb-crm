import { fio } from '../../utils/fio';
import { formatDate } from '../../utils/formatDate';
import { formatTime } from '../../utils/formatTime';
import { contactItem } from '../contacts/contactItem';
import { handleModalClientChange } from '../handlers/handleModalClientChange';
import { handleModalClientRemove } from '../handlers/handleModalClientRemove';

export const mobileClientItems = clientData =>
	clientData.map(client => {
		const { id, name, surname, lastName, contacts, createdAt, updatedAt } =
			client;

		const item = document.createElement('li'),
			itemTop = document.createElement('div'),
			itemId = document.createElement('p'),
			itemName = document.createElement('p'),
			itemTabBtn = document.createElement('button'),
			itemBottom = document.createElement('ul'),
			itemCreateAt = document.createElement('li'),
			itemCreateAtTitle = document.createElement('p'),
			itemCreateAtDate = document.createElement('p'),
			itemCreateAtTime = document.createElement('p'),
			itemUpdateAt = document.createElement('li'),
			itemUpdateAtTitle = document.createElement('p'),
			itemUpdateAtDate = document.createElement('p'),
			itemUpdateAtTime = document.createElement('p'),
			itemContacts = document.createElement('li'),
			itemContactsTitle = document.createElement('p'),
			itemContactsList = document.createElement('ul'),
			itemContactsItems = contactItem(contacts),
			itemActions = document.createElement('li'),
			itemActionChangeBtn = document.createElement('button'),
			itemActionRemoveBtn = document.createElement('button');

		item.className = 'first:border-t solid border-neutral-300';
		itemTop.className =
			'h-15 px-3.75 py-5 flex justify-between items-center gap-3 border-b solid border-neutral-300 bg-white';
		itemId.className = 'text-xs text-neutral-300';
		itemName.className = 'text-center text-[14px]';
		itemTabBtn.className = 'block';
		itemBottom.className = 'bg-neutral-100 p-3.75 text-[14px]';
		itemCreateAt.className = 'flex items-center mb-3';
		itemCreateAtTitle.className = 'text-xs mr-2.5 text-neutral-300';
		itemCreateAtDate.className = 'mr-2';
		itemCreateAtTime.className = 'text-neutral-300';
		itemUpdateAt.className = 'flex items-center mb-3';
		itemUpdateAtTitle.className = 'text-xs mr-2.5 text-neutral-300';
		itemUpdateAtDate.className = 'mr-2';
		itemUpdateAtTime.className = 'text-neutral-300';
		itemContacts.className = 'flex items-center mb-6';
		itemContactsTitle.className = 'text-xs mr-2.5 text-neutral-300';
		itemContactsList.className = 'flex items-center gap-2';
		itemActions.className = 'flex items-center gap-7.5';
		itemActionChangeBtn.className = 'flex items-center';
		itemActionRemoveBtn.className = 'flex items-center';

		itemId.innerText = id;
		itemName.innerText = fio(client);
		itemTabBtn.innerHTML = `
			<svg
				class='text-violet-500 shrink-0'
				width='20'
				height='20'
				viewBox='0 0 20 20'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<circle cx='10' cy='10' r='9.5' stroke='currentColor' />
				<path
					d='M14 10L13.295 9.295L10.5 12.085V6L9.5 6V12.085L6.71 9.29L6 10L10 14L14 10Z'
					fill='currentColor'
				/>
			</svg>
		`;
		itemCreateAtTitle.innerText = 'Дата и время создания';
		itemCreateAtDate.innerText = formatDate(createdAt);
		itemCreateAtTime.innerText = formatTime(createdAt);
		itemUpdateAtTitle.innerText = 'Последние изменения';
		itemUpdateAtDate.innerText = formatDate(updatedAt);
		itemUpdateAtTime.innerText = formatTime(updatedAt);
		itemContactsTitle.innerText = 'Контакты';
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

		document.body.addEventListener('click', ({ target }) => {
			if (target === itemActionChangeBtn) {
				handleModalClientChange(client);
			}

			if (target === itemActionRemoveBtn) {
				handleModalClientRemove(id);
			}
		});

		itemTop.append(itemId, itemName, itemTabBtn);
		itemCreateAt.append(itemCreateAtTitle, itemCreateAtDate, itemCreateAtTime);
		itemUpdateAt.append(itemUpdateAtTitle, itemUpdateAtDate, itemUpdateAtTime);
		itemContactsList.append(...itemContactsItems);
		itemContacts.append(itemContactsTitle, itemContactsList);
		itemActions.append(itemActionChangeBtn, itemActionRemoveBtn);
		itemBottom.append(itemCreateAt, itemUpdateAt, itemContacts, itemActions);
		item.append(itemTop, itemBottom);

		return item;
	});
