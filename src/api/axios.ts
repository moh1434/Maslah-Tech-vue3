import axios, { AxiosResponse } from 'axios';

const baseUrl = import.meta.env.PROD
	? 'https://freelancer-back-end.herokuapp.com/v1/'
	: 'http://localhost:3001/v1/';
export const api = axios.create({
	baseURL: baseUrl,
});

//new way
export async function apiWrapper<ServerData>(
	axiosMethod: () => Promise<
		AxiosResponse<
			{
				data: ServerData;
			},
			any
		>
	>
) {
	let response = null;
	let errors = null;
	try {
		response = await axiosMethod();
	} catch (e: any) {
		if (e?.response?.data?.err) {
			//The backend puts the errors here :(
			errors = e.response.data.err;
		} else {
			//unknown error
			errors = e;
		}
	}

	return { response, errors };
}
function getAlertMethod(wantLog: Boolean) {
	if (wantLog) {
		return (errors: any) => {
			console.log(errors);
		};
	}
	return (errors: any) => {
		alert(errors);
	};
}
export function errorAlerter(errors: any, wantLog = false) {
	if (errors) {
		const alertMethod = getAlertMethod(wantLog);
		try {
			alertMethod(JSON.stringify(errors));
		} catch (e) {
			alertMethod(errors);
		}
		return 'alerted';
	}
	return; //no errors
}

// Usage example
/*
  apiWrapper<userI>(
    async () =>
      await api.get<{ data: userI }>(`/user/${route.params.userId as string}`)
  ).then(({ response, errors }) => {
    console.log('res=', response?.data);
    errorAlerter(errors);
  });
 */
