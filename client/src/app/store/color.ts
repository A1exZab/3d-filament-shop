import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ColorPayload } from 'app/types'
import { RootState } from './configureStore'
import colorService from 'app/services/color.service'

type ColorState = {
	entities: ColorPayload[] | null
	isLoading: boolean
	error: Error | null
}

const initialState: ColorState = {
	entities: null,
	isLoading: false,
	error: null
}

const colorSlice = createSlice({
	name: '@@color',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllColors.pending, (state) => {
			state.error = null
			state.isLoading = true
		})

		builder.addCase(getAllColors.fulfilled, (state, action) => {
			state.isLoading = false
			state.entities = action.payload
		})

		builder.addCase(getAllColors.rejected, (state, action) => {
			state.isLoading = false
			if (action.payload) {
				state.error = action.payload
			}
		})

		builder.addCase(addColor.pending, (state) => {
			state.error = null
			state.isLoading = true
		})

		builder.addCase(addColor.fulfilled, (state, action) => {
			state.isLoading = false
			if (!Array.isArray(state.entities)) {
				state.entities = []
			}
			state.entities.push(action.payload)
		})

		builder.addCase(addColor.rejected, (state, action) => {
			state.isLoading = false
			if (action.payload) {
				state.error = action.payload
			}
		})
	}
})

export const getAllColors = createAsyncThunk<ColorPayload[], undefined, { rejectValue: Error }>(
	'@@color/getAll',
	async function (_, { rejectWithValue }) {
		try {
			const data = await colorService.getAllColors()
			const colors = data.map((color) => ({
				colorId: color._id,
				name: color.name,
				code: color.code
			}))
			return colors
		} catch (e: any) {
			let error: AxiosError<Error, Record<string, unknown>> = e
			if (!error.response) {
				throw e
			}
			return rejectWithValue(error.response.data)
		}
	}
)

export const addColor = createAsyncThunk<
	ColorPayload,
	Omit<ColorPayload, 'colorId'>,
	{ rejectValue: Error }
>('@@color/addColor', async function (payload, { rejectWithValue }) {
	try {
		const data = await colorService.addColor(payload)
		return { colorId: data._id, name: data.name, code: data.code }
	} catch (e: any) {
		let error: AxiosError<Error, Record<string, unknown>> = e
		if (!error.response) {
			throw e
		}
		return rejectWithValue(error.response.data)
	}
})

export const getColorById = (colorId: string) => (state: RootState) => {
	if (state.color.entities) {
		return state.color.entities.find((color) => color.colorId === colorId)
	}
}

export default colorSlice.reducer
