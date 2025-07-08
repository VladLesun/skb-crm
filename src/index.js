import { handleModalClientAdd } from './js/modules/handlers/handleModalClientAdd';
import { renderClientList } from './js/renderClient/renderClient';
import { renderMobileClientList } from './js/renderClient/renderMobileClientList';
import { getClients, searchClient } from './js/servers/servers';
import { appendFio } from './js/utils/appendFio';
import { debounce } from './js/utils/debounce';
import { search } from './js/utils/search';
import { sortClients } from './js/utils/sortClients';
import { addClientBtnNode, searchInputNode } from './js/vars/const';

export let clientList = [],
	filteredClientList = [];
let sortColumn = 'id',
	sortColumnDir = true;

const handleSearchClient = debounce(async () => {
	const searchedClients = search(clientList, 'fio');
	let result = await searchClient(searchedClients);
	const resultWithFio = appendFio(result);
	const sorted = sortClients(resultWithFio, sortColumn, sortColumnDir);

	filteredClientList = sorted;
	renderClientList(sorted);
});

const handleSortedClients = sortBtn => {
	const sortBtnActive = document.querySelector('.sort-btn.sort-btn_active');
	const sortBtnSvg = document.querySelector('.sort-btn.sort-btn_svg');
	const sortBtnDataset = sortBtn.dataset.sort;

	if (sortColumn === sortBtnDataset) {
		sortColumnDir = !sortColumnDir;
		if (!sortColumnDir) {
			sortBtn.classList.remove('sort-btn_svg');
		} else {
			sortBtn.classList.add('sort-btn_svg');
		}
	} else {
		sortBtnActive?.classList.remove('sort-btn_active');
		sortBtnSvg?.classList.remove('sort-btn_svg');
		sortColumn = sortBtnDataset;
		sortColumnDir = true;
		sortBtn.classList.add('sort-btn_active');
		sortBtn.classList.add('sort-btn_svg');
	}

	const sortedClients = sortClients(
		appendFio(filteredClientList),
		sortColumn,
		sortColumnDir
	);

	renderMobileClientList(sortedClients);
	renderClientList(sortedClients);
};

const init = async () => {
	const serverData = await getClients();

	if (serverData) {
		clientList = appendFio(serverData);
		filteredClientList = [...clientList];
	}

	searchInputNode.addEventListener('input', handleSearchClient);

	document.body.addEventListener('click', ({ target }) => {
		if (target.closest('.sort-btn')) {
			if (!serverData) {
				return;
			}

			handleSortedClients(target.closest('.sort-btn'));
		}

		if (target === addClientBtnNode) {
			handleModalClientAdd();
		}
	});

	renderMobileClientList(clientList);
	renderClientList(clientList);
};

init();
