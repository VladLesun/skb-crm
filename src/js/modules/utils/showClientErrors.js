export const showClientErrors = errors => {
	document.querySelectorAll('.message-error').forEach(el => {
		el.innerText = '';
	});

	errors.forEach(({ field, message }) => {
		const errorMessage = document.querySelector(`[data-error-for="${field}"]`);

		if (errorMessage) {
			errorMessage.innerText = message;
		}
	});
};
