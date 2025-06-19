export function formatTime(time) {
	var currentTime = new Date(time);
	var hr = currentTime.getHours();
	var min = currentTime.getMinutes();
	if (hr < 10) {
		hr = '0' + hr;
	}
	if (min < 10) {
		min = '0' + min;
	}

	return [hr, min].join(':');
}
