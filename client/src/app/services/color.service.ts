import httpService from './http.service'
import { ColorPayload, ColorResponse } from 'app/types'

const colorEndPoint = 'color/'

const colorService = {
	getAllColors: async (): Promise<ColorResponse[]> => {
		const { data } = await httpService.get(colorEndPoint)
		return data
	},
	addColor: async (payload: Omit<ColorPayload, 'colorId'>): Promise<ColorResponse> => {
		const { data } = await httpService.post(colorEndPoint, payload, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('access')}`
			}
		})
		return data
	}
}

export default colorService
