import httpService from './http.service'
import { ManufacturerPayload, ManufacturerResponse } from 'app/types'

const manufacturerEndPoint = 'manufacturer/'

const manufacturerService = {
	getAllManufacturers: async (): Promise<ManufacturerResponse[]> => {
		const { data } = await httpService.get(manufacturerEndPoint)
		return data
	},

	addManufacturer: async (
		payload: Omit<ManufacturerPayload, 'manufacturerId'>
	): Promise<ManufacturerResponse> => {
		const { data } = await httpService.post(manufacturerEndPoint, payload, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('access')}`
			}
		})
		return data
	}
}

export default manufacturerService
