export const showServerErrors = error => {
	const errorArray = error.errors.errors;
	if (Array.isArray(errorArray)) {
		errorArray.forEach(({ field, message }) => {
			console.warn(`Ошибка в поле "${field}": ${message}`);
		});
	} else {
		console.error(error.message);
	}
};
