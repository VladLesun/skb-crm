export const showClientErrors = errors => {
	document.querySelectorAll('.message-error').forEach(el => {
		el.innerText = '';
	});

	errors.forEach(({ field, message }) => {
		console.log('message: ', message);
		console.log('field: ', field);
		const errorMessage = document.querySelector(`[data-error-for="${field}"]`);

		if (errorMessage) {
			errorMessage.innerText = message;
		}
	});
};
