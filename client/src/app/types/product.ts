import {
	ColorPayload,
	ColorResponse,
	ManufacturerPayload,
	ManufacturerResponse,
	MaterialPayload,
	MaterialResponse
} from '.'

export type ProductResponse = {
	_id: string
	name: string
	fullName: string
	price: number
	printSpeed: string
	amount: number
	img: string
	bedTemp: string
	hotendTemp: string
	diameter: number
	weight: number
	material: string
	color: string
	manufacturer: string
}

export type ExtendedProductResponse = {
	_id: string
	name: string
	fullName: string
	price: number
	printSpeed: string
	amount: number
	img: string
	bedTemp: string
	hotendTemp: string
	diameter: number
	weight: number
	material: MaterialResponse
	color: ColorResponse
	manufacturer: ManufacturerResponse
}

export type ProductPayload = {
	productId: string
	name: string
	fullName: string
	price: number
	printSpeed: string
	amount: number
	img: string
	bedTemp: string
	hotendTemp: string
	diameter: number
	weight: number
	material: string
	color: string
	manufacturer: string
}

export type ExtendedProductPayload = {
	productId: string
	name: string
	fullName: string
	price: number
	printSpeed: string
	amount: number
	img: string
	bedTemp: string
	hotendTemp: string
	diameter: number
	weight: number
	material: MaterialPayload
	color: ColorPayload
	manufacturer: ManufacturerPayload
}

export type ProductUpdatePayload = {
	productId: string
	payload: Partial<Omit<ProductPayload, 'productId'>>
}

export type ProductAmountUpdatePayload = {
	productId: string
	amount: number
}
