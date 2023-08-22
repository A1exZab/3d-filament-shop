import { AppDispatch, RootState } from './configureStore'
import { SignInPayload, SignUpPayload, User } from 'app/types'
import authService from 'app/services/auth.service'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { userDecode } from 'app/utils/userDecode'

type UserState = {
	user: User | null
	isLoading: boolean
	isAuth: boolean
	authError: Error | null
}

const initialState: UserState = {
	user: null,
	isLoading: false,
	isAuth: false,
	authError: null
}

const userSlice = createSlice({
	name: '@@user',
	initialState,
	reducers: {
		autErrorReset: (state) => {
			state.authError = null
		}
	},
	extraReducers: (builder) => {
		builder.addCase(signUp.pending, (state) => {
			state.authError = null
		})

		builder.addCase(signUp.fulfilled, (state, action) => {
			state.isAuth = true
			state.user = action.payload
		})

		builder.addCase(signUp.rejected, (state, action) => {
			if (action.payload) {
				state.authError = action.payload
			}
		})

		builder.addCase(signIn.pending, (state) => {
			state.authError = null
		})

		builder.addCase(signIn.fulfilled, (state, action) => {
			state.isAuth = true
			state.user = action.payload
		})

		builder.addCase(signIn.rejected, (state, action) => {
			if (action.payload) {
				state.authError = action.payload
			}
		})

		builder.addCase(signOut.pending, (state) => {
			state.authError = null
		})

		builder.addCase(signOut.fulfilled, (state) => {
			state.isAuth = false
			state.user = null
		})

		builder.addCase(signOut.rejected, (state, action) => {
			if (action.payload) {
				state.authError = action.payload
			}
		})

		builder.addCase(checkAuth.pending, (state) => {
			state.authError = null
			state.isLoading = true
		})

		builder.addCase(checkAuth.fulfilled, (state, action) => {
			state.isAuth = true
			state.user = action.payload
			state.isLoading = false
		})

		builder.addCase(checkAuth.rejected, (state, action) => {
			state.isLoading = false
			if (action.payload) {
				state.authError = action.payload
			}
		})
	}
})

const { autErrorReset } = userSlice.actions

export const signUp = createAsyncThunk<User, SignUpPayload, { rejectValue: Error }>(
	'@@user/signUp',
	async function (payload, { rejectWithValue }) {
		try {
			const response = await authService.signUp(payload)
			localStorage.setItem('access', response.data.accessToken)
			localStorage.setItem('refresh', response.data.refreshToken)

			return userDecode(response.data.accessToken)
		} catch (e: any) {
			let error: AxiosError<Error, Record<string, unknown>> = e
			if (!error.response) {
				throw e
			}
			return rejectWithValue(error.response.data)
		}
	}
)

export const signIn = createAsyncThunk<User, SignInPayload, { rejectValue: Error }>(
	'@@user/signIn',
	async function (payload, { rejectWithValue }) {
		try {
			const response = await authService.signIn(payload)
			localStorage.setItem('access', response.data.accessToken)
			localStorage.setItem('refresh', response.data.refreshToken)

			return userDecode(response.data.accessToken)
		} catch (e: any) {
			let error: AxiosError<Error, Record<string, unknown>> = e
			if (!error.response) {
				throw e
			}
			return rejectWithValue(error.response.data)
		}
	}
)

export const signOut = createAsyncThunk<undefined, undefined, { rejectValue: Error }>(
	'@@user/signOut',
	async function (_, { rejectWithValue }) {
		try {
			await authService.signOut()
			localStorage.removeItem('access')
			localStorage.removeItem('refresh')
		} catch (e: any) {
			let error: AxiosError<Error, Record<string, unknown>> = e
			if (!error.response) {
				throw e
			}
			return rejectWithValue(error.response.data)
		}
	}
)

export const checkAuth = createAsyncThunk<User, undefined, { rejectValue: Error }>(
	'@@user/checkAuth',
	async function (_, { rejectWithValue }) {
		try {
			const response = await authService.refresh()
			localStorage.setItem('access', response.data.accessToken)
			localStorage.setItem('refresh', response.data.refreshToken)

			return userDecode(response.data.accessToken)
		} catch (e: any) {
			let error: AxiosError<Error, Record<string, unknown>> = e
			if (!error.response) {
				throw e
			}
			return rejectWithValue(error.response.data)
		}
	}
)

export const isAdmin =
	() =>
	(state: RootState): boolean => {
		const role = state.user.user?.role
		return role === 'ADMIN'
	}

export const resetAuthError = () => (dispatch: AppDispatch) => {
	dispatch(autErrorReset())
}

export const getUserId = () => (state: RootState) => {
	return state.user.user!.userId
}

export default userSlice.reducer
