import { mobileClientListNode } from '../const/const';
import { formatDate } from '../utils/formatDate';
import { formatTime } from '../utils/formatTime';

export const renderMobileClientList = data => {
	mobileClientListNode.innerHTML = '';

	data.forEach(item => {
		const { id, name, surname, lastName, contacts, createdAt, updatedAt } =
			item;

		const itemNode = document.createElement('li'),
			itemTopNode = document.createElement('div'),
			itemIdNode = document.createElement('p'),
			itemNameNode = document.createElement('p'),
			itemTabBtnNode = document.createElement('button'),
			itemBottomNode = document.createElement('ul'),
			itemCreateAtNode = document.createElement('li'),
			itemCreateAtTitleNode = document.createElement('p'),
			itemCreateAtDateNode = document.createElement('p'),
			itemCreateAtTimeNode = document.createElement('p'),
			itemUpdateAtNode = document.createElement('li'),
			itemUpdateAtTitleNode = document.createElement('p'),
			itemUpdateAtDateNode = document.createElement('p'),
			itemUpdateAtTimeNode = document.createElement('p'),
			itemContactsNode = document.createElement('li'),
			itemContactsTitleNode = document.createElement('p'),
			itemContactsListNode = document.createElement('ul'),
			itemContactNode = document.createElement('li'),
			itemActionsNode = document.createElement('li'),
			itemActionChangeBtnNode = document.createElement('button'),
			itemActionRemoveBtnNode = document.createElement('button');

		itemNode.className = 'first:border-t solid border-neutral-300';
		itemTopNode.className =
			'h-15 px-3.75 py-5 flex justify-between items-center gap-3 border-b solid border-neutral-300 bg-white';
		itemIdNode.className = 'text-xs text-neutral-300';
		itemNameNode.className = 'text-center text-[14px]';
		itemTabBtnNode.className = 'block';
		itemBottomNode.className = 'bg-neutral-100 p-3.75 text-[14px]';
		itemCreateAtNode.className = 'flex items-center mb-3';
		itemCreateAtTitleNode.className = 'text-xs mr-2.5 text-neutral-300';
		itemCreateAtDateNode.className = 'mr-2';
		itemCreateAtTimeNode.className = 'text-neutral-300';
		itemUpdateAtNode.className = 'flex items-center mb-3';
		itemUpdateAtTitleNode.className = 'text-xs mr-2.5 text-neutral-300';
		itemUpdateAtDateNode.className = 'mr-2';
		itemUpdateAtTimeNode.className = 'text-neutral-300';
		itemContactsNode.className = 'flex items-center mb-6';
		itemContactsTitleNode.className = 'text-xs mr-2.5 text-neutral-300';
		itemContactsListNode.className = 'flex items-center gap-2';
		// itemContactNode.className = '';
		itemActionsNode.className = 'flex items-center gap-7.5';
		itemActionChangeBtnNode.className = 'flex items-center';
		itemActionRemoveBtnNode.className = 'flex items-center';

		itemIdNode.innerText = id;
		itemNameNode.innerText = `${surname} ${name} ${lastName}`;
		itemTabBtnNode.innerHTML = `
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
		itemCreateAtTitleNode.innerText = 'Дата и время создания';
		itemCreateAtDateNode.innerText = formatDate(createdAt);
		itemCreateAtTimeNode.innerText = formatTime(createdAt);
		itemUpdateAtTitleNode.innerText = 'Последние изменения';
		itemUpdateAtDateNode.innerText = formatDate(updatedAt);
		itemUpdateAtTimeNode.innerText = formatTime(updatedAt);
		itemContactsTitleNode.innerText = 'Контакты';
		itemContactNode.innerText = 'элемент';
		itemActionChangeBtnNode.innerHTML = `
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
		itemActionRemoveBtnNode.innerHTML = `
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

		itemTopNode.append(itemIdNode, itemNameNode, itemTabBtnNode);
		itemCreateAtNode.append(
			itemCreateAtTitleNode,
			itemCreateAtDateNode,
			itemCreateAtTimeNode
		);
		itemUpdateAtNode.append(
			itemUpdateAtTitleNode,
			itemUpdateAtDateNode,
			itemUpdateAtTimeNode
		);
		itemContactsNode.append(itemContactsTitleNode, itemContactsListNode);
		itemActionsNode.append(itemActionChangeBtnNode, itemActionRemoveBtnNode);
		itemBottomNode.append(
			itemCreateAtNode,
			itemUpdateAtNode,
			itemContactsNode,
			itemActionsNode
		);
		itemNode.append(itemTopNode, itemBottomNode);
		mobileClientListNode.append(itemNode);
	});

	return mobileClientListNode;
};
