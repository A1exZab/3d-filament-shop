import httpService from './http.service'
import { DeliveryMethodResponse } from 'app/types'

const deliveryEndPoint = 'delivery/'

const deliveryService = {
	getDeliveries: async (): Promise<DeliveryMethodResponse[]> => {
		const { data } = await httpService.get(deliveryEndPoint)
		return data
	}
}

export default deliveryService
