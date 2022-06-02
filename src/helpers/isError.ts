/** Not perfect */
export function isError(err: any) {
	if (!err || !err.stack || !err.message) {
		return false;
	}
	return true;
}
