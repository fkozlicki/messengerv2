import axios from 'axios';

const baseURL = 'http://localhost:8080/api/v1';

const axiosInstance = axios.create({
	baseURL,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const tokens = JSON.parse(localStorage.getItem('tokens') ?? '');

		if (tokens?.accessToken) {
			config.headers.Authorization = `Bearer ${tokens.accessToken}`;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response.status === 403) {
			const tokens = JSON.parse(localStorage.getItem('tokens') ?? '');

			const response = await axios.post(`${baseURL}/auth/refresh-token`, null, {
				headers: {
					Authorization: `Bearer ${tokens.refreshToken}`,
				},
			});

			if (response.status === 200) {
				localStorage.setItem('tokens', JSON.stringify(response.data));
				axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;
			}
		}
	}
);

export default axiosInstance;
