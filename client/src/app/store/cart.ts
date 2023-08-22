import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import {
	OrderElementError,
	OrderElementResponse,
	OrderElementUpdatePayload,
	ProductPayload
} from 'app/types'
import { AppDispatch, RootState } from './configureStore'
import orderService from 'app/services/order.service'
import orderElementService from 'app/services/orderElement.service'
import productService from 'app/services/product.service'

type CartState = {
	entities: OrderElementResponse[] | null
	isLoading: boolean
	error: OrderElementError | null
}

const initialState: CartState = {
	entities: null,
	isLoading: false,
	error: null
}

const cartSlice = createSlice({
	name: '@@cart',
	initialState,
	reducers: {
		cartReset: (state) => {
			state.entities = null
		},
		cartErrorReset: (state) => {
			state.error = null
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getCurrentCart.pending, (state) => {
			state.error = null
			state.isLoading = true
		})

		builder.addCase(getCurrentCart.fulfilled, (state, action) => {
			state.isLoading = false
			if (!Array.isArray(state.entities)) {
				state.entities = []
			}
			if (action.payload) {
				state.entities = action.payload
			}
		})

		builder.addCase(getCurrentCart.rejected, (state, action) => {
			state.isLoading = false
			if (action.payload) {
				state.error = action.payload
			}
		})

		builder.addCase(addCartElement.pending, (state) => {
			state.error = null
			state.isLoading = true
		})

		builder.addCase(addCartElement.fulfilled, (state, action) => {
			state.isLoading = false
			if (!Array.isArray(state.entities)) {
				state.entities = []
			}
			if (action.payload) {
				const existingElementId = state.entities.findIndex(
					(element) => element._id === action.payload!._id
				)

				if (existingElementId === -1) {
					state.entities.push(action.payload)
				} else {
					state.entities[existingElementId] = action.payload
				}
			}
		})

		builder.addCase(addCartElement.rejected, (state, action) => {
			state.isLoading = false
			if (action.payload) {
				state.error = action.payload
			}
		})

		builder.addCase(updateCartElement.pending, (state) => {
			state.error = null
		})

		builder.addCase(updateCartElement.fulfilled, (state, action) => {
			if (!Array.isArray(state.entities)) {
				state.entities = []
			}
			if (action.payload) {
				const existingElementId = state.entities.findIndex(
					(element) => element._id === action.payload!._id
				)

				if (existingElementId === -1) {
					state.entities.push(action.payload)
				} else {
					state.entities[existingElementId] = action.payload
				}
			}
		})

		builder.addCase(updateCartElement.rejected, (state, action) => {
			if (action.payload) {
				state.error = action.payload
			}
		})

		builder.addCase(removeCartElement.pending, (state) => {
			state.error = null
		})

		builder.addCase(removeCartElement.fulfilled, (state, action) => {
			if (state.entities) {
				state.entities = state.entities.filter((entity) => entity.productId !== action.payload)
			}
		})

		builder.addCase(removeCartElement.rejected, (state, action) => {
			if (action.payload) {
				state.error = action.payload
			}
		})
	}
})

const { cartErrorReset, cartReset } = cartSlice.actions

export const addCartElement = createAsyncThunk<
	OrderElementResponse | null,
	ProductPayload & { quantity: number },
	{ state: RootState; rejectValue: Error }
>('@@cart/addElement', async function (payload, { getState, rejectWithValue }) {
	try {
		const { user } = getState().user

		if (user) {
			const newOrder = await orderService.getNewOrder(user.userId)
			const elementInOrder = await orderElementService.checkElementInOrder(
				newOrder._id,
				payload.productId
			)

			if (!elementInOrder) {
				const newCartElement = await orderElementService.createElement({
					orderId: newOrder._id,
					productId: payload.productId,
					amount: payload.quantity,
					sum: payload.price * payload.quantity
				})

				return newCartElement
			} else {
				const updatedCartElement = await orderElementService.addToExistingElement(
					elementInOrder._id,
					{
						amount: payload.quantity,
						sum: payload.quantity * payload.price,
						productId: payload.productId
					}
				)
				return updatedCartElement
			}
		}
		return null
	} catch (e: any) {
		let error: AxiosError<Error, Record<string, unknown>> = e
		if (!error.response) {
			throw e
		}
		return rejectWithValue(error.response.data)
	}
})

export const getCurrentCart = createAsyncThunk<
	OrderElementResponse[] | null,
	undefined,
	{ state: RootState; rejectValue: Error }
>('@@cart/getCurrent', async function (_, { getState, rejectWithValue }) {
	try {
		const { user } = getState().user

		if (user) {
			const products = await productService.getAllProducts()
			const newOrder = await orderService.getNewOrder(user.userId)
			const elementsInCart = await orderElementService.getByOrderId(newOrder._id)

			const currentElementsInCart = await Promise.all(
				elementsInCart.map(async (element) => {
					const foundProduct = products.find((product) => product._id === element.productId)

					if (foundProduct && foundProduct.amount < element.amount) {
						const currentElement = await orderElementService.updateElement(element._id, {
							amount: foundProduct.amount
						})

						return currentElement
					}

					return element
				})
			)

			return currentElementsInCart
		}
		return null
	} catch (e: any) {
		let error: AxiosError<Error, Record<string, unknown>> = e
		if (!error.response) {
			throw e
		}
		return rejectWithValue(error.response.data)
	}
})

export const updateCartElement = createAsyncThunk<
	OrderElementResponse,
	OrderElementUpdatePayload,
	{ state: RootState; rejectValue: Error }
>('@@cart/updateElement', async function (payload, { rejectWithValue }) {
	try {
		const updatedCartElement = await orderElementService.updateElement(payload.orderElementId, {
			amount: payload.amount,
			sum: payload.sum,
			productId: payload.productId
		})
		return updatedCartElement
	} catch (e: any) {
		let error: AxiosError<Error, Record<string, unknown>> = e
		if (!error.response) {
			throw e
		}
		return rejectWithValue(error.response.data)
	}
})

export const removeCartElement = createAsyncThunk<string, string, { rejectValue: Error }>(
	'@@cart/removeElement',
	async function (payload, { rejectWithValue }) {
		try {
			await orderElementService.removeByProductId(payload)

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

export const getProductsAmount = () => (state: RootState) => {
	if (state.cart.entities) {
		return state.cart.entities.reduce((acc, current) => acc + current.amount, 0)
	}
	return 0
}

export const getTotalSum = () => (state: RootState) => {
	if (state.cart.entities) {
		return state.cart.entities.reduce((acc, current) => acc + current.sum, 0)
	}
	return 0
}

export const getOrderId = () => (state: RootState) => {
	if (state.cart.entities) {
		return state.cart.entities[0].orderId
	}
}

export const resetCart = () => (dispatch: AppDispatch) => {
	dispatch(cartReset())
}

export const resetCartError = () => (dispatch: AppDispatch) => {
	dispatch(cartErrorReset())
}

export default cartSlice.reducer
