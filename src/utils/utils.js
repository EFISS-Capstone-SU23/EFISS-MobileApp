export const formatNumber = (numberString) => {
	const number = parseInt(numberString, 10);
	const formattedNumber = number.toLocaleString('en-US', {
		style: 'decimal',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});
	return formattedNumber;
};
