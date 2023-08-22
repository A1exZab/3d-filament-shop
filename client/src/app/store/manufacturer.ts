import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ManufacturerPayload } from 'app/types'

import { RootState } from './configureStore'
import manufacturerService from 'app/services/manufacturer.service'

type ManufacturerState = {
	entities: ManufacturerPayload[] | null
	isLoading: boolean
	error: Error | null
}

const initialState: ManufacturerState = {
	entities: null,
	isLoading: false,
	error: null
}

const manufacturerSlice = createSlice({
	name: '@@manufacturer',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllManufacturers.pending, (state) => {
			state.error = null
			state.isLoading = true
		})

		builder.addCase(getAllManufacturers.fulfilled, (state, action) => {
			state.isLoading = false
			state.entities = action.payload
		})

		builder.addCase(getAllManufacturers.rejected, (state, action) => {
			state.isLoading = false
			if (action.payload) {
				state.error = action.payload
			}
		})

		builder.addCase(addManufacturer.pending, (state) => {
			state.error = null
			state.isLoading = true
		})

		builder.addCase(addManufacturer.fulfilled, (state, action) => {
			state.isLoading = false
			state.isLoading = false
			if (!Array.isArray(state.entities)) {
				state.entities = []
			}
			state.entities.push(action.payload)
		})

		builder.addCase(addManufacturer.rejected, (state, action) => {
			state.isLoading = false
			if (action.payload) {
				state.error = action.payload
			}
		})
	}
})

export const getAllManufacturers = createAsyncThunk<
	ManufacturerPayload[],
	undefined,
	{ rejectValue: Error }
>('@@manufacturer/getAll', async function (_, { rejectWithValue }) {
	try {
		const data = await manufacturerService.getAllManufacturers()
		const manufacturers = data.map((manufacturer) => ({
			manufacturerId: manufacturer._id,
			name: manufacturer.name
		}))
		return manufacturers
	} catch (e: any) {
		let error: AxiosError<Error, Record<string, unknown>> = e
		if (!error.response) {
			throw e
		}
		return rejectWithValue(error.response.data)
	}
})

export const addManufacturer = createAsyncThunk<
	ManufacturerPayload,
	Omit<ManufacturerPayload, 'manufacturerId'>,
	{ rejectValue: Error }
>('@@color/addManufacturer', async function (payload, { rejectWithValue }) {
	try {
		const data = await manufacturerService.addManufacturer(payload)
		return { manufacturerId: data._id, name: data.name }
	} catch (e: any) {
		let error: AxiosError<Error, Record<string, unknown>> = e
		if (!error.response) {
			throw e
		}
		return rejectWithValue(error.response.data)
	}
})

export const getManufacturerById = (manufacturerId: string) => (state: RootState) => {
	if (state.manufacturer.entities) {
		return state.manufacturer.entities.find(
			(manufacturer) => manufacturer.manufacturerId === manufacturerId
		)
	}
}

export default manufacturerSlice.reducer
