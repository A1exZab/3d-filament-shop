import { OrderElementPayload, OrderElementResponse } from 'app/types'
import httpService from './http.service'

const orderElementEndPoint = 'orderElement/'

const orderElementService = {
	checkElementInOrder: async (
		orderId: string,
		productId: string
	): Promise<OrderElementResponse> => {
		const { data } = await httpService.get(orderElementEndPoint + 'find', {
			params: { orderId, productId },
			headers: {
				authorization: `Bearer ${localStorage.getItem('access')}`
			}
		})

		return data
	},

	createElement: async (payload: OrderElementPayload): Promise<OrderElementResponse> => {
		const { data } = await httpService.post(orderElementEndPoint, payload, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('access')}`
			}
		})

		return data
	},

	addToExistingElement: async (
		orderElementId: string,
		payload: Partial<OrderElementPayload>
	): Promise<OrderElementResponse> => {
		const { data } = await httpService.patch(
			orderElementEndPoint + 'addToExisting/' + orderElementId,
			payload,
			{
				headers: {
					authorization: `Bearer ${localStorage.getItem('access')}`
				}
			}
		)

		return data
	},

	updateElement: async (
		orderElementId: string,
		payload: Partial<OrderElementPayload>
	): Promise<OrderElementResponse> => {
		const { data } = await httpService.patch(
			orderElementEndPoint + 'update/' + orderElementId,
			payload,
			{
				headers: {
					authorization: `Bearer ${localStorage.getItem('access')}`
				}
			}
		)

		return data
	},

	removeByProductId: async (productId: string): Promise<void> => {
		await httpService.delete(orderElementEndPoint + productId, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('access')}`
			}
		})
	},

	getByOrderId: async (orderId: string): Promise<OrderElementResponse[]> => {
		const { data } = await httpService.get(orderElementEndPoint + orderId, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('access')}`
			}
		})

		return data
	}
}

export default orderElementService
