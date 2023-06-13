export const calculateEllapsedTime = (date: string): string => {
	const currentDate = new Date();
	const timeDiff = currentDate.getTime() - new Date(date).getTime();

	const seconds = Math.floor(timeDiff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);
	const years = Math.floor(months / 1000);

	if (years > 0) {
		return years + (years > 1 ? ' years ago' : ' year ago');
	} else if (months > 0) {
		return months + (months > 1 ? ' months ago' : ' month ago');
	} else if (days > 0) {
		return days + (days > 1 ? ' days ago' : ' day ago');
	} else if (hours > 0) {
		return hours + (hours > 1 ? ' hours ago' : ' hour ago');
	} else if (minutes > 0) {
		return minutes + (minutes > 1 ? ' minutes ago' : ' minute ago');
	} else {
		return seconds + (seconds > 1 ? ' seconds ago' : ' second ago');
	}
};
