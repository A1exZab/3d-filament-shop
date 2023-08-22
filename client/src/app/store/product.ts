import {
	ExtendedProductPayload,
	ProductAmountUpdatePayload,
	ProductPayload,
	ProductUpdatePayload
} from 'app/types'
import { RootState } from './configureStore'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productService from 'app/services/product.service'
import { AxiosError } from 'axios'

interface ProductState {
	entities: ProductPayload[] | null
	isLoading: boolean
	error: Error | null
}

const initialState: ProductState = {
	entities: null,
	isLoading: false,
	error: null
}

const productSlice = createSlice({
	name: '@@product',
	initialState,
	reducers: {},

	extraReducers: (builder) => {
		builder.addCase(getAllProducts.pending, (state) => {
			state.error = null
			state.isLoading = true
		})

		builder.addCase(getAllProducts.fulfilled, (state, action) => {
			state.isLoading = false
			state.entities = action.payload
		})

		builder.addCase(getAllProducts.rejected, (state, action) => {
			state.isLoading = false
			if (action.payload) {
				state.error = action.payload
			}
		})

		builder.addCase(getFilteredProducts.pending, (state) => {
			state.error = null
		})

		builder.addCase(getFilteredProducts.fulfilled, (state, action) => {
			state.entities = action.payload
		})

		builder.addCase(getFilteredProducts.rejected, (state, action) => {
			if (action.payload) {
				state.error = action.payload
			}
		})

		builder.addCase(getProductById.pending, (state) => {
			state.isLoading = true
			state.error = null
		})

		builder.addCase(getProductById.fulfilled, (state) => {
			state.isLoading = false
		})

		builder.addCase(getProductById.rejected, (state, action) => {
			state.isLoading = false
			if (action.payload) {
				state.error = action.payload
			}
		})

		builder.addCase(removeProduct.pending, (state) => {
			state.error = null
		})

		builder.addCase(removeProduct.fulfilled, (state, action) => {
			if (state.entities) {
				state.entities = state.entities.filter((entity) => entity.productId !== action.payload)
			}
		})

		builder.addCase(removeProduct.rejected, (state, action) => {
			if (action.payload) {
				state.error = action.payload
			}
		})

		builder.addCase(updateProduct.pending, (state) => {
			state.error = null
			state.isLoading = true
		})

		builder.addCase(updateProduct.fulfilled, (state, action) => {
			state.isLoading = false
			if (state.entities) {
				state.entities[
					state.entities.findIndex((product) => product.productId === action.payload.productId)
				] = action.payload
			}
		})

		builder.addCase(updateProduct.rejected, (state, action) => {
			state.isLoading = false
			if (action.payload) {
				state.error = action.payload
			}
		})

		builder.addCase(updateProductAmount.pending, (state) => {
			state.error = null
			state.isLoading = true
		})

		builder.addCase(updateProductAmount.fulfilled, (state, action) => {
			state.isLoading = false
			if (state.entities) {
				state.entities[
					state.entities.findIndex((product) => product.productId === action.payload.productId)
				] = action.payload
			}
		})

		builder.addCase(updateProductAmount.rejected, (state, action) => {
			state.isLoading = false
			if (action.payload) {
				state.error = action.payload
			}
		})

		builder.addCase(createProduct.pending, (state) => {
			state.error = null
			state.isLoading = true
		})

		builder.addCase(createProduct.fulfilled, (state, action) => {
			state.isLoading = false
			if (!Array.isArray(state.entities)) {
				state.entities = []
			}
			state.entities.push(action.payload)
		})

		builder.addCase(createProduct.rejected, (state, action) => {
			state.isLoading = false
			if (action.payload) {
				state.error = action.payload
			}
		})
	}
})

export const getAllProducts = createAsyncThunk<ProductPayload[], undefined, { rejectValue: Error }>(
	'@@product/getAll',
	async function (_, { rejectWithValue }) {
		try {
			const data = await productService.getAllProducts()
			const products = data.map((product) => ({
				productId: product._id,
				name: product.name,
				fullName: product.fullName,
				price: product.price,
				printSpeed: product.printSpeed,
				amount: product.amount,
				img: product.img,
				bedTemp: product.bedTemp,
				hotendTemp: product.hotendTemp,
				diameter: product.diameter,
				weight: product.weight,
				material: product.material,
				color: product.color,
				manufacturer: product.manufacturer
			}))

			return products
		} catch (e: any) {
			let error: AxiosError<Error, Record<string, unknown>> = e
			if (!error.response) {
				throw e
			}
			return rejectWithValue(error.response.data)
		}
	}
)

export const getFilteredProducts = createAsyncThunk<
	ProductPayload[],
	{ selected?: string[]; search?: string },
	{ rejectValue: Error }
>('@@product/getFiltered', async function (payload, { rejectWithValue }) {
	try {
		const data = await productService.getProductByFilter(payload.selected, payload.search)

		const products = data.map((product) => ({
			productId: product._id,
			name: product.name,
			fullName: product.fullName,
			price: product.price,
			printSpeed: product.printSpeed,
			amount: product.amount,
			img: product.img,
			bedTemp: product.bedTemp,
			hotendTemp: product.hotendTemp,
			diameter: product.diameter,
			weight: product.weight,
			material: product.material,
			color: product.color,
			manufacturer: product.manufacturer
		}))

		return products
	} catch (e: any) {
		let error: AxiosError<Error, Record<string, unknown>> = e
		if (!error.response) {
			throw e
		}
		return rejectWithValue(error.response.data)
	}
})

export const getProductById = createAsyncThunk<
	ExtendedProductPayload,
	string,
	{ rejectValue: Error }
>('@@product/getById', async function (payload, { rejectWithValue }) {
	try {
		const data = await productService.getProductById(payload)

		const product = {
			productId: data._id,
			name: data.name,
			fullName: data.fullName,
			price: data.price,
			printSpeed: data.printSpeed,
			amount: data.amount,
			img: data.img,
			bedTemp: data.bedTemp,
			hotendTemp: data.hotendTemp,
			diameter: data.diameter,
			weight: data.weight,
			material: { name: data.material.name, materialId: data.material._id },
			color: { name: data.color.name, code: data.color.code, colorId: data.color._id },
			manufacturer: { name: data.manufacturer.name, manufacturerId: data.manufacturer._id }
		}

		return product
	} catch (e: any) {
		let error: AxiosError<Error, Record<string, unknown>> = e
		if (!error.response) {
			throw e
		}
		return rejectWithValue(error.response.data)
	}
})

export const removeProduct = createAsyncThunk<string, string, { rejectValue: Error }>(
	'@@product/remove',
	async function (payload, { rejectWithValue }) {
		try {
			await productService.removeProduct(payload)
			return payload
		} catch (e: any) {
			let error: AxiosError<Error, Record<string, unknown>> = e
			if (!error.response) {
				throw e
			}
			return rejectWithValue(error.response.data)
		}
	}
)

export const createProduct = createAsyncThunk<
	ProductPayload,
	Omit<ProductPayload, 'productId' | 'fullName'>,
	{ rejectValue: Error }
>('@@product/create', async function (payload, { rejectWithValue }) {
	try {
		const data = await productService.createProduct(payload)

		return {
			productId: data._id,
			name: data.name,
			fullName: data.fullName,
			price: data.price,
			printSpeed: data.printSpeed,
			amount: data.amount,
			img: data.img,
			bedTemp: data.bedTemp,
			hotendTemp: data.hotendTemp,
			diameter: data.diameter,
			weight: data.weight,
			material: data.material,
			color: data.color,
			manufacturer: data.manufacturer
		}
	} catch (e: any) {
		let error: AxiosError<Error, Record<string, unknown>> = e
		if (!error.response) {
			throw e
		}
		return rejectWithValue(error.response.data)
	}
})

export const updateProduct = createAsyncThunk<
	ProductPayload,
	ProductUpdatePayload,
	{ rejectValue: Error }
>('@@product/update', async function ({ productId, payload }, { rejectWithValue }) {
	try {
		const data = await productService.updateProduct(productId, payload)

		return {
			productId: data._id,
			name: data.name,
			fullName: data.fullName,
			price: data.price,
			printSpeed: data.printSpeed,
			amount: data.amount,
			img: data.img,
			bedTemp: data.bedTemp,
			hotendTemp: data.hotendTemp,
			diameter: data.diameter,
			weight: data.weight,
			material: data.material,
			color: data.color,
			manufacturer: data.manufacturer
		}
	} catch (e: any) {
		let error: AxiosError<Error, Record<string, unknown>> = e
		if (!error.response) {
			throw e
		}
		return rejectWithValue(error.response.data)
	}
})

export const updateProductAmount = createAsyncThunk<
	ProductPayload,
	ProductAmountUpdatePayload,
	{ rejectValue: Error }
>('@@product/updateAmount', async function ({ productId, amount }, { rejectWithValue }) {
	try {
		const data = await productService.updateProductAmount(productId, amount)

		return {
			productId: data._id,
			name: data.name,
			fullName: data.fullName,
			price: data.price,
			printSpeed: data.printSpeed,
			amount: data.amount,
			img: data.img,
			bedTemp: data.bedTemp,
			hotendTemp: data.hotendTemp,
			diameter: data.diameter,
			weight: data.weight,
			material: data.material,
			color: data.color,
			manufacturer: data.manufacturer
		}
	} catch (e: any) {
		let error: AxiosError<Error, Record<string, unknown>> = e
		if (!error.response) {
			throw e
		}
		return rejectWithValue(error.response.data)
	}
})

export const getCurrentProduct = (productId: string) => (state: RootState) => {
	if (state.product.entities) {
		return state.product.entities.find((product) => product.productId === productId)
	}
}

export default productSlice.reducer
