export const showPreloader = itemId => {
	const preloader = document.getElementById(itemId);

	if (preloader) {
		preloader.classList.remove('hidden');
	}
};

export const hidePreloader = itemId => {
	const preloader = document.getElementById(itemId);

	if (preloader) {
		preloader.classList.add('hidden');
	}
};
