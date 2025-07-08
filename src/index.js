import { handleModalClientAdd } from './js/modules/handlers/handleModalClientAdd';
import { renderClientList } from './js/renderClient/renderClient';
import { renderMobileClientList } from './js/renderClient/renderMobileClientList';
import { getClients } from './js/servers/servers';
import { fio } from './js/utils/fio';
import { sortClients } from './js/utils/sortClients';
import { addClientBtnNode } from './js/vars/const';

export let clientList = [];
let sortColumn = 'id',
	sortColumnDir = true;

const init = async () => {
	const serverData = await getClients();

	if (serverData) {
		clientList = serverData;
		for (const client of clientList) {
			client.fio = fio(client);
		}
		clientList = sortClients(clientList, sortColumn, sortColumnDir);
	}

	document.body.addEventListener('click', ({ target }) => {
		const sortBtn = target.closest('.sort-btn');
		const sortBtnActive = document.querySelector('.sort-btn.sort-btn_active');
		const sortBtnSvg = document.querySelector('.sort-btn.sort-btn_svg');
		const sortBtnDataset = sortBtn.dataset.sort;

		if (sortBtn) {
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

			const sortedClients = sortClients(clientList, sortColumn, sortColumnDir);

			renderMobileClientList(sortedClients);
			renderClientList(sortedClients);
		}
	});

	addClientBtnNode.addEventListener('click', handleModalClientAdd);

	renderMobileClientList(clientList);
	renderClientList(clientList);
};

init();
