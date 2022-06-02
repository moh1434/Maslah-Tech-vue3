import { api, apiWrapper, errorAlerter } from '@/api/axios';
import { Ref, unref } from 'vue';
import { startLoading, stopLoading } from './useLoading';

export function confirmDeleteItem<T>(
	event: Event,
	url: Ref<string> | string,
	token: Ref<string> | string
) {
	if (confirm('Are you sure to delete this?')) {
		return deleteItem<T>(event, url, token);
	}
}
export async function deleteItem<T>(
	event: Event,
	url: string | Ref<string>,
	token: Ref<string> | string,
	deletedSuccessfullyMsg: string | Ref<string> = 'deleted successfully'
) {
	startLoading(event.target as HTMLButtonElement);

	const { response, errors } = await apiWrapper<T>(
		async () =>
			await api.delete<{ data: T }>(unref(url), {
				headers: { token: unref(token) },
			})
	);

	if (errors) {
		errorAlerter(errors);
		stopLoading(event.target as HTMLButtonElement);
		return Promise.reject();
	}

	stopLoading(event.target as HTMLButtonElement);
	alert(unref(deletedSuccessfullyMsg));
	if (response?.data) {
		return response;
	}
}
