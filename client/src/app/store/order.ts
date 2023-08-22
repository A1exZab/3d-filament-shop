import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { OrderConfirmPayload, OrderResponse } from 'app/types'
import { AppDispatch, RootState } from './configureStore'
import orderService from 'app/services/order.service'

type OrderState = {
	entities: Required<OrderResponse>[] | null
	isLoading: boolean
	error: Error | null
}

const initialState: OrderState = {
	entities: null,
	isLoading: false,
	error: null
}

const orderSlice = createSlice({
	name: '@@order',
	initialState,
	reducers: {
		ordersReset: (state) => {
			state.entities = null
		}
	},
	extraReducers: (builder) => {
		builder.addCase(confirmOrder.pending, (state) => {
			state.error = null
			state.isLoading = true
		})

		builder.addCase(confirmOrder.fulfilled, (state) => {
			state.isLoading = false
		})

		builder.addCase(confirmOrder.rejected, (state, action) => {
			state.isLoading = false
			if (action.payload) {
				state.error = action.payload
			}
		})

		builder.addCase(getCompletedOrders.pending, (state) => {
			state.error = null
			state.isLoading = true
		})

		builder.addCase(getCompletedOrders.fulfilled, (state, action) => {
			state.isLoading = false
			if (!Array.isArray(state.entities)) {
				state.entities = []
			}
			if (action.payload) {
				state.entities = action.payload
			}
		})

		builder.addCase(getCompletedOrders.rejected, (state, action) => {
			state.isLoading = false
			if (action.payload) {
				state.error = action.payload
			}
		})
	}
})

const { ordersReset } = orderSlice.actions

export const confirmOrder = createAsyncThunk<
	OrderResponse,
	OrderConfirmPayload & { orderId: string },
	{ state: RootState; rejectValue: Error }
>('@@order/confirm', async function (payload, { rejectWithValue }) {
	try {
		const confirmedOrder = await orderService.confirmOrder(payload.orderId, {
			status: payload.status,
			sum: payload.sum,
			address: payload.address,
			delivery: payload.delivery
		})

		return confirmedOrder
	} catch (e: any) {
		let error: AxiosError<Error, Record<string, unknown>> = e
		if (!error.response) {
			throw e
		}
		return rejectWithValue(error.response.data)
	}
})

export const getCompletedOrders = createAsyncThunk<
	Required<OrderResponse>[],
	string,
	{ state: RootState; rejectValue: Error }
>('@@order/getCompleted', async function (userId, { rejectWithValue }) {
	try {
		const completedOrders = await orderService.getCompletedOrders(userId)

		return completedOrders
	} catch (e: any) {
		let error: AxiosError<Error, Record<string, unknown>> = e
		if (!error.response) {
			throw e
		}
		return rejectWithValue(error.response.data)
	}
})

export const resetOrders = () => (dispatch: AppDispatch) => {
	dispatch(ordersReset())
}

export default orderSlice.reducer
