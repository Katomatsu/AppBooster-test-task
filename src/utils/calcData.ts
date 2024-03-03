const convertData = (date: string) => {
	const publicDate = new Date().getTime() - new Date(date).getTime();
	const minutesDifference = Math.floor(publicDate / (1000 * 60));
	const hoursDifference = Math.floor(publicDate / (1000 * 60 * 60));
	const daysDifference =
		Math.floor(publicDate / (1000 * 60 * 60 * 24)) >= 1
			? Math.round(publicDate / (1000 * 60 * 60 * 24))
			: Math.floor(publicDate / (1000 * 60 * 60 * 24));
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
		if (daysDifference) return `was closed ${daysDifference} ${daysDifference > 1 ? 'days' : 'day'} ago`;
		if (hoursDifference) return `was closed ${hoursDifference} ${hoursDifference > 1 ? 'hours' : 'hour'} ago`;
		return `was closed ${minutesDifference} ${minutesDifference > 1 ? 'minutes' : 'minute'} ago`;
	} else if (state === 'OPEN') {
		if (daysDifference) return `opened ${daysDifference} ${daysDifference > 1 ? 'days' : 'day'} ago`;
		if (hoursDifference) return `opened ${hoursDifference} ${hoursDifference > 1 ? 'hours' : 'hour'} ago`;
		return `opened ${minutesDifference} ${minutesDifference > 1 ? 'minutes' : 'minute'} ago`;
	} else if(!state) {
    if (daysDifference) return `commented ${daysDifference} ${daysDifference > 1 ? 'days' : 'day'} ago`;
	if (hoursDifference) return `commented ${hoursDifference} ${hoursDifference > 1 ? 'hours' : 'hour'} ago`;
	return `commented ${minutesDifference} ${minutesDifference > 1 ? 'minutes' : 'minute'} ago`;
  }
	return '';
};

