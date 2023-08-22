import httpService from './http.service'
import { MaterialPayload, MaterialResponse } from 'app/types'

const materialEndPoint = 'material/'

const materialService = {
	getAllMaterials: async (): Promise<MaterialResponse[]> => {
		const { data } = await httpService.get(materialEndPoint)
		return data
	},

	addMaterial: async (payload: Omit<MaterialPayload, 'materialId'>): Promise<MaterialResponse> => {
		const { data } = await httpService.post(materialEndPoint, payload, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('access')}`
			}
		})
		return data
	}
}

export default materialService
