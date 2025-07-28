
export const search = (arr, prop, value) => {
	let resultArr = [];
	const clientArrCopy = [...arr];

	clientArrCopy.map(client => {
		if (String(client[prop]).toLowerCase().includes(String(value))) {
			resultArr.push(client);
		}
	});

	return resultArr;
};
