import { handleModalClientAdd } from './js/modules/handlers/handleModalClientAdd';
import { renderClient } from './js/modules/render/renderClient';
import { getClients, searchClient } from './js/modules/servers/servers';
import { appendFio } from './js/modules/utils/appendFio';
import { debounce } from './js/modules/utils/debounce';
import { search } from './js/modules/utils/search';
import { sortClients } from './js/modules/utils/sortClients';
import { addClientBtnNode, searchInputNode } from './js/vars/const';

export let clientList = [],
	filteredClientList = [];

let sortColumn = 'id',
	sortColumnDir = true;

let currentScreenMode = window.innerWidth < 767 ? 'mobile' : 'desktop';

const handleSearchClient = debounce(async () => {
	const searchedClients = search(clientList, 'fio');
	let result = await searchClient(searchedClients);
	const resultWithFio = appendFio(result);
	const sorted = sortClients(resultWithFio, sortColumn, sortColumnDir);

	filteredClientList = sorted;
	renderClient(sorted);
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

	renderClient(sortedClients);
};

const init = async () => {
	const serverData = await getClients();

	if (serverData) {
		clientList = appendFio(serverData);
		filteredClientList = [...clientList];
	}

	const handleResize = debounce(() => {
		const newScreenMode = window.innerWidth < 767 ? 'mobile' : 'desktop';

		if (newScreenMode !== currentScreenMode) {
			currentScreenMode = newScreenMode;
			renderClient(filteredClientList);
		}
	}, 100);

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

	window.addEventListener('resize', handleResize);

	renderClient(filteredClientList);
};

init();
