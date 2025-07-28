import { handleModalClientAdd } from './js/modules/handlers/handleModalClientAdd';
import { renderClient } from './js/modules/render/renderClient';
import { getClients } from './js/modules/servers/servers';
import { appendFio } from './js/modules/utils/appendFio';
import { debounce } from './js/modules/utils/debounce';
import { search } from './js/modules/utils/search';
import { sortClients } from './js/modules/utils/sortClients';
import {
	addClientBtnNode,
	clientListNode,
	searchInputNode,
} from './js/vars/const';

export let clientList = [],
	filteredClientList = [];

let sortColumn = 'id',
	sortColumnDir = true;

let searchValue = '';

let currentScreenMode = window.innerWidth < 767 ? 'mobile' : 'desktop';

const refreshClientList = async () => {
	const serverData = await getClients();
	if (!serverData) return false;

	clientList = appendFio(serverData);
	updateFilteredClientList();
	return true;
};

const updateFilteredClientList = () => {
	let baseList = [...clientList];

	if (searchValue) {
		baseList = search(baseList, 'fio', searchValue);
	}

	filteredClientList = sortClients(baseList, sortColumn, sortColumnDir);
	renderClient(filteredClientList);
};

const handleSearchClient = debounce(async () => {
	searchValue = searchInputNode.value.toLowerCase().trim();
	const updateServerData = await refreshClientList();
	if (!updateServerData) return;

	if (filteredClientList.length === 0) {
		clientListNode.innerHTML = `<p class="absolute top-1/2 left-1/2  translate-[-50%]">К сожалению клиент не найден...</p>`;
		return;
	}
});

const handleSortedClients = async sortBtn => {
	const sortBtnActive = document.querySelector('.sort-btn.sort-btn_active');
	const sortBtnSvg = document.querySelector('.sort-btn.sort-btn_svg');
	const sortBtnDataset = sortBtn.dataset.sort;

	if (sortColumn === sortBtnDataset) {
		sortColumnDir = !sortColumnDir;
		sortBtn.classList.toggle('sort-btn_svg', sortColumnDir);
	} else {
		sortBtnActive?.classList.remove('sort-btn_active');
		sortBtnSvg?.classList.remove('sort-btn_svg');
		sortColumn = sortBtnDataset;
		sortColumnDir = true;
		sortBtn.classList.add('sort-btn_active', 'sort-btn_svg');
	}

	updateFilteredClientList();
};

const handleResize = debounce(() => {
	const newScreenMode = window.innerWidth < 767 ? 'mobile' : 'desktop';

	if (newScreenMode !== currentScreenMode) {
		currentScreenMode = newScreenMode;
		updateFilteredClientList();
	}
}, 100);

const init = async () => {
	const updateServerData = await refreshClientList();
	if (!updateServerData) return;

	searchInputNode.addEventListener('input', handleSearchClient);

	document.body.addEventListener('click', ({ target }) => {
		if (target.closest('.sort-btn')) {
			handleSortedClients(target.closest('.sort-btn'));
		}

		if (target === addClientBtnNode) {
			handleModalClientAdd();
		}
	});

	window.addEventListener('resize', handleResize);
};

init();
