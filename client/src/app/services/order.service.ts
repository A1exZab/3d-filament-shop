import httpService from './http.service'
import { OrderConfirmPayload, OrderResponse } from 'app/types'

const orderEndPoint = 'order/'

const orderService = {
	getNewOrder: async (userId: string): Promise<OrderResponse> => {
		const { data } = await httpService.post(
			orderEndPoint,
			{ userId },
			{
				headers: {
					authorization: `Bearer ${localStorage.getItem('access')}`
				}
			}
		)
		return data
	},

	getCompletedOrders: async (userId: string): Promise<Required<OrderResponse>[]> => {
		const { data } = await httpService.get(orderEndPoint + 'completed/' + userId, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('access')}`
			}
		})

		return data
	},

	confirmOrder: async (orderId: string, payload: OrderConfirmPayload): Promise<OrderResponse> => {
		const { data } = await httpService.patch(
			orderEndPoint + orderId,
			{ ...payload },
			{
				headers: {
					authorization: `Bearer ${localStorage.getItem('access')}`
				}
			}
		)

		return data
	}
}

export default orderService
