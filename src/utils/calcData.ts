const convertData = (date: string) => {
	const publicDate = new Date().getTime() - new Date(date).getTime();
	const minutesDifference = Math.floor(publicDate / (1000 * 60));
	const hoursDifference = Math.floor(publicDate / (1000 * 60 * 60));
	const daysDifference = Math.floor(publicDate / (1000 * 60 * 60 * 24));
	return {
		minutesDifference,
		hoursDifference,
		daysDifference
	};
};

export const renderDateAgo = (date: string, state?: string) => {
	const { daysDifference, hoursDifference, minutesDifference } =
		convertData(date);
	if (state === 'CLOSED') {
		if (daysDifference) return `was closed ${daysDifference} days ago`;
		if (hoursDifference) return `was closed ${hoursDifference} hours ago`;
		return `was closed ${minutesDifference} minutes ago`;
	} else if (state === 'OPEN') {
		if (daysDifference) return `opened ${daysDifference} days ago`;
		if (hoursDifference) return `opened ${hoursDifference} hours ago`;
		return `opened ${minutesDifference} minutes ago`;
	} else if(!state) {
    if (daysDifference) return `commented ${daysDifference} days ago`;
	if (hoursDifference) return `commented ${hoursDifference} hours ago`;
	return `commented ${minutesDifference} minutes ago`;
  }
	return '';
};
