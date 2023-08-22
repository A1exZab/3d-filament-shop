import orderElementService from 'app/services/orderElement.service'
import productService from 'app/services/product.service'

export const checkCartProducts = async (orderId: string) => {
	const products = await productService.getAllProducts()
	const elementsInCart = await orderElementService.getByOrderId(orderId)

	return elementsInCart.every((element) => {
		const foundProduct = products.find((product) => product._id === element.productId)

		if (foundProduct) {
			return foundProduct.amount >= element.amount
		}
	})
}
