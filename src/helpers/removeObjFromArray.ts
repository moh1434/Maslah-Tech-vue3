export function deleteObjFromArray<T extends Object>(
	list: Array<T>,
	targetKey: keyof T,
	targetValue: unknown,
	indexErr = {
		msg: 'findIndex result is undefined!',
		showAlert: false,
	}
) {
	const index = list.findIndex((item) => item[targetKey] == targetValue);
	if (index === undefined) {
		indexErr.showAlert ? alert(indexErr.msg) : console.error(indexErr.msg);
	} else if (index !== -1) {
		list.splice(index, 1);
	}
}
