import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { MaterialPayload } from 'app/types'
import { RootState } from './configureStore'
import materialService from 'app/services/material.service'

type MaterialState = {
	entities: MaterialPayload[] | null
	isLoading: boolean
	error: Error | null
}

const initialState: MaterialState = {
	entities: null,
	isLoading: false,
	error: null
}

const materialSlice = createSlice({
	name: '@@material',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllMaterials.pending, (state) => {
			state.error = null
			state.isLoading = true
		})

		builder.addCase(getAllMaterials.fulfilled, (state, action) => {
			state.isLoading = false
			state.entities = action.payload
		})

		builder.addCase(getAllMaterials.rejected, (state, action) => {
			state.isLoading = false
			if (action.payload) {
				state.error = action.payload
			}
		})

		builder.addCase(addMaterial.pending, (state) => {
			state.error = null
			state.isLoading = true
		})

		builder.addCase(addMaterial.fulfilled, (state, action) => {
			state.isLoading = false
			if (!Array.isArray(state.entities)) {
				state.entities = []
			}
			state.entities.push(action.payload)
		})

		builder.addCase(addMaterial.rejected, (state, action) => {
			state.isLoading = false
			if (action.payload) {
				state.error = action.payload
			}
		})
	}
})

export const getAllMaterials = createAsyncThunk<
	MaterialPayload[],
	undefined,
	{ rejectValue: Error }
>('@@material/getAll', async function (_, { rejectWithValue }) {
	try {
		const data = await materialService.getAllMaterials()
		const materials = data.map((material) => ({ materialId: material._id, name: material.name }))

		return materials
	} catch (e: any) {
		let error: AxiosError<Error, Record<string, unknown>> = e
		if (!error.response) {
			throw e
		}
		return rejectWithValue(error.response.data)
	}
})

export const addMaterial = createAsyncThunk<
	MaterialPayload,
	Omit<MaterialPayload, 'materialId'>,
	{ rejectValue: Error }
>('@@color/addMaterial', async function (payload, { rejectWithValue }) {
	try {
		const data = await materialService.addMaterial(payload)
		return { materialId: data._id, name: data.name }
	} catch (e: any) {
		let error: AxiosError<Error, Record<string, unknown>> = e
		if (!error.response) {
			throw e
		}
		return rejectWithValue(error.response.data)
	}
})

export const getMaterialById = (materialId: string) => (state: RootState) => {
	if (state.material.entities) {
		return state.material.entities.find((material) => material.materialId === materialId)
	}
}

export default materialSlice.reducer
