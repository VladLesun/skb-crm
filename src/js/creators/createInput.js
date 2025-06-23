export const createInput = (inputName, inputPlaceholder) => {
	const input = document.createElement('input');

	input.className =
		'w-full h-6 border-b solid border-neutral-300 text-[14px] outline-0';
	input.type = 'text';
	input.name = inputName;
	input.placeholder = inputPlaceholder;

	return input;
};
