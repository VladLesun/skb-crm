export const sortClients = (clientsArray, prop, dir) => {
	let copyClientList = [...clientsArray];
	return copyClientList.sort((clientA, clientB) => {
		if (
			!dir == false
				? clientA[prop] < clientB[prop]
				: clientA[prop] > clientB[prop]
		)
			return -1;
	});
};
