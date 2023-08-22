export enum OrderStatus {
	NEW = 'NEW',
	PROCESSED = 'PROCESSED',
	FAILED = 'FAILED'
}

export type OrderResponse = {
	_id: string
	userId: string
	status: OrderStatus
	createdAt?: string
	updatedAt?: string
	sum?: number
	address?: string
	delivery?: string
}

export type DeliveryMethodResponse = {
	_id: string
	name: string
	price?: number
}

export type OrderConfirmPayload = {
	status: OrderStatus
	sum: number
	address: string
	delivery: string
}
