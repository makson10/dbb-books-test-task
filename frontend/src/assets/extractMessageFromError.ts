export const extractMessageFromError = (err: unknown) => {
	let msg = 'Operation failed';
	if (typeof err === 'string') msg = err;
	else if (err && typeof err === 'object') {
		const maybeErr = err as { message?: string; data?: { message?: string } };
		msg = maybeErr.data?.message || maybeErr.message || msg;
	}
	return msg;
};
