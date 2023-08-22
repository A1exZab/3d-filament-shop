import { AxiosResponse } from 'axios'
import { AuthResponse, SignInPayload, SignUpPayload } from 'app/types'
import httpService, { API_URL } from './http.service'

const API_AUTH_URL = `${API_URL}/auth`

const authService = {
	signUp: async (payload: SignUpPayload): Promise<AxiosResponse<AuthResponse>> => {
		return httpService.post<AuthResponse>(API_AUTH_URL + '/signup', payload)
	},

	signIn: async (payload: SignInPayload): Promise<AxiosResponse<AuthResponse>> => {
		return httpService.post<AuthResponse>(API_AUTH_URL + '/signin', payload)
	},

	refresh: async (): Promise<AxiosResponse<AuthResponse>> => {
		return httpService.post(
			API_AUTH_URL + '/refresh',
			{},
			{
				headers: {
					authorization: `Bearer ${localStorage.getItem('refresh')}`
				}
			}
		)
	},

	signOut: async (): Promise<void> => {
		return httpService.post(
			API_AUTH_URL + '/signout',
			{},
			{
				headers: {
					authorization: `Bearer ${localStorage.getItem('access')}`
				}
			}
		)
	}
}

export default authService
