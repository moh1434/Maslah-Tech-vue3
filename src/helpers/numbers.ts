export function isPositiveInteger(str: string | number | any) {
	if (typeof str !== 'string' && typeof str !== 'number') {
		return false;
	}

	const num = Number(str);

	if (Number.isInteger(num) && num > 0) {
		return true;
	}

	return false;
}
