import {
	addClientBtnNode,
	addPopupNode,
	changeClientBtnNode,
	changePopupNode,
	removeClientBtnNode,
	removePopupNode,
} from './js/const/const';

const init = () => {
	addClientBtnNode.addEventListener('click', () => {
		addPopupNode.classList.remove('hidden');
	});
	changeClientBtnNode.addEventListener('click', () => {
		changePopupNode.classList.remove('hidden');
	});
	removeClientBtnNode.addEventListener('click', () => {
		removePopupNode.classList.remove('hidden');
	});
};

init();
