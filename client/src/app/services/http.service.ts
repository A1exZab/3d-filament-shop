import axios from 'axios'
import { AuthResponse } from 'app/types'
export const API_URL = import.meta.env.VITE_REACT_API_URL + 'api'

const http = axios.create({
	baseURL: API_URL
})

http.interceptors.response.use(
	(config) => {
		return config
	},
	async (error) => {
		const originalRequest = error.config
		if (error.response.status == 401 && error.config && !error.config._isRetry) {
			originalRequest._isRetry = true
			try {
				const response = await axios.post<AuthResponse>(
					`${API_URL}/auth/refresh`,
					{},
					{
						headers: {
							authorization: `Bearer ${localStorage.getItem('refresh')}`
						}
					}
				)
				localStorage.setItem('access', response.data.accessToken)
				localStorage.setItem('refresh', response.data.refreshToken)
				return http.request(originalRequest)
			} catch (e) {
				return Promise.reject(e)
			}
		}
		throw error
	}
)

const httpService = {
	get: http.get,
	post: http.post,
	put: http.put,
	delete: http.delete,
	patch: http.patch
}

export default httpService
