import { clientListNode } from '../const/const';
import { formatDate } from '../utils/formatDate';
import { formatTime } from '../utils/formatTime';

export const renderClientList = data => {
	clientListNode.innerHTML = '';

	const clientItems = data.map(
		({ id, name, surname, lastName, contacts, createdAt, updatedAt }) => {
			const itemNode = document.createElement('li'),
				itemIdWrapNode = document.createElement('div'),
				itemIdNode = document.createElement('p'),
				itemNameWrapNode = document.createElement('div'),
				itemNameNode = document.createElement('p'),
				itemCreateAtWrapNode = document.createElement('div'),
				itemCreateAtDateNode = document.createElement('p'),
				itemCreateAtTimeNode = document.createElement('p'),
				itemUpdateAtWrapNode = document.createElement('div'),
				itemUpdateAtDateNode = document.createElement('p'),
				itemUpdateAtTimeNode = document.createElement('p'),
				itemContactsListNode = document.createElement('ul'),
				itemActionsNode = document.createElement('div'),
				itemActionChangeBtnNode = document.createElement('button'),
				itemActionRemoveBtnNode = document.createElement('button');

			itemNode.className =
				'h-15 grid grid-cols-[auto_218px_98px_98px_129px_auto] md:gap-1 lg:grid-cols-[90px_234px_152px_152px_148px_auto] border-b solid border-neutral-300';
			itemIdWrapNode.className = 'flex items-center justify-center';
			itemIdNode.className = 'text-xs text-neutral-300';
			itemNameWrapNode.className = 'flex items-center justify-start';
			itemNameNode.className = 'text-[14px]';
			itemCreateAtWrapNode.className =
				'flex flex-col items-center justify-center lg:flex-row lg:justify-start lg:gap-2.5';
			itemCreateAtDateNode.className =
				'text-[14px] md:self-start lg:self-center';
			itemCreateAtTimeNode.className =
				'text-[14px] text-neutral-300 md:self-start lg:self-center';
			itemUpdateAtWrapNode.className =
				'flex flex-col items-center justify-center lg:flex-row lg:justify-start lg:gap-2.5';
			itemUpdateAtDateNode.className =
				'text-[14px] md:self-start lg:self-center';
			itemUpdateAtTimeNode.className =
				'text-[14px] text-neutral-300 md:self-start lg:self-center';
			itemContactsListNode.className =
				'flex items-center justify-start gap-2.5';
			itemActionsNode.className =
				'flex flex-col items-center justify-center gap-1 lg:flex-row lg:justify-start lg:gap-3';
			itemActionChangeBtnNode.className =
				'flex items-center text-[14px] md:self-start lg:self-center';
			itemActionRemoveBtnNode.className =
				'flex items-center text-[14px] md:self-start lg:self-center';

			itemIdNode.innerText = id;
			itemNameNode.innerText = `${surname} ${name} ${lastName}`;
			itemCreateAtDateNode.innerText = formatDate(createdAt);
			itemCreateAtTimeNode.innerText = formatTime(createdAt);
			itemUpdateAtDateNode.innerText = formatDate(updatedAt);
			itemUpdateAtTimeNode.innerText = formatTime(updatedAt);
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

			itemIdWrapNode.append(itemIdNode);
			itemNameWrapNode.append(itemNameNode);
			itemCreateAtWrapNode.append(itemCreateAtDateNode, itemCreateAtTimeNode);
			itemUpdateAtWrapNode.append(itemUpdateAtDateNode, itemUpdateAtTimeNode);
			// itemContactsListNode.append();
			itemActionsNode.append(itemActionChangeBtnNode, itemActionRemoveBtnNode);
			itemNode.append(
				itemIdWrapNode,
				itemNameWrapNode,
				itemCreateAtWrapNode,
				itemUpdateAtWrapNode,
				itemContactsListNode,
				itemActionsNode
			);

			return itemNode;
		}
	);

	clientListNode.append(...clientItems);
};
