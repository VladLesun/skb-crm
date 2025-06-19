import { renderClientList } from './js/renderClient/renderClient';
import { renderMobileClientList } from './js/renderClient/renderMobileClientList';
import { getClients } from './js/servers/servers';

const init = async () => {
	const clientData = await getClients();
	renderMobileClientList(clientData);
	renderClientList(clientData);
};

init();
