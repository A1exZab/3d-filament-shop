export type OrderElementPayload = {
	orderId: string
	productId: string
	sum: number
	amount: number
}

export type OrderElementUpdatePayload = {
	orderElementId: string
	productId: string
	sum: number
	amount: number
}

export type OrderElementResponse = {
	_id: string
	orderId: string
	productId: string
	sum: number
	amount: number
}

export type OrderElementError = {
	message: string
	statusCode?: string
	error?: string
}
