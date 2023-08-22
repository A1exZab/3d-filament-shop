import { ProductPayload, ProductResponse, ExtendedProductResponse } from 'app/types'
import httpService from './http.service'

const productEndPoint = 'product/'

const productService = {
	getAllProducts: async (): Promise<ProductResponse[]> => {
		const { data } = await httpService.get(productEndPoint)
		return data
	},

	getProductById: async (productId: string): Promise<ExtendedProductResponse> => {
		const { data } = await httpService.get(productEndPoint + productId)
		return data
	},

	getProductByFilter: async (
		materialId?: string[],
		search?: string
	): Promise<ProductResponse[]> => {
		const { data } = await httpService.get(productEndPoint + 'findByFilter', {
			params: { materialId, search }
		})

		return data
	},

	removeProduct: async (productId: string): Promise<void> => {
		await httpService.delete(productEndPoint + productId, {
			headers: {
				authorization: `Bearer ${localStorage.getItem('access')}`
			}
		})
	},

	createProduct: async (
		payload: Omit<ProductPayload, 'productId' | 'fullName'>
	): Promise<ProductResponse> => {
		const { data } = await httpService.post(productEndPoint, payload, {
			headers: {
				'Content-Type': 'multipart/form-data',
				authorization: `Bearer ${localStorage.getItem('access')}`
			}
		})

		return data
	},

	updateProduct: async (
		productId: string,
		payload: Partial<ProductPayload>
	): Promise<ProductResponse> => {
		const { data } = await httpService.patch(productEndPoint + productId, payload, {
			headers: {
				'Content-Type': 'multipart/form-data',
				authorization: `Bearer ${localStorage.getItem('access')}`
			}
		})

		return data
	},

	updateProductAmount: async (productId: string, amount: number): Promise<ProductResponse> => {
		const { data } = await httpService.patch(
			productEndPoint + 'amount/' + productId,
			{ amount },
			{
				headers: {
					authorization: `Bearer ${localStorage.getItem('access')}`
				}
			}
		)

		return data
	}
}

export default productService
