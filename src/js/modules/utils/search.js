import { searchInputNode } from '../../vars/const';

export const search = (
	arr,
	prop,
	value = searchInputNode.value.toLowerCase().trim()
) => {
	let resultList = [];
	const clientListCopy = [...arr];

	clientListCopy.map(client => {
		if (String(client[prop]).toLowerCase().includes(String(value))) {
			resultList.push(client);
		}
	});

	return resultList;
};
