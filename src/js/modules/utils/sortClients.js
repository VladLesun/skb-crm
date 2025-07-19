export const sortClients = (clientsArray, prop, dir) =>
	[...clientsArray].sort((clientA, clientB) => {
		if (
			!dir == false
				? clientA[prop] < clientB[prop]
				: clientA[prop] > clientB[prop]
		)
			return -1;
	});
