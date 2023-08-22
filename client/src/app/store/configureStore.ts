import { configureStore, combineReducers } from '@reduxjs/toolkit'
import productReducer from './product'
import userReducer from './user'
import colorReducer from './color'
import manufacturerReducer from './manufacturer'
import materialReducer from './material'
import cartReducer from './cart'
import orderReducer from './order'

const rootReducer = combineReducers({
	product: productReducer,
	user: userReducer,
	color: colorReducer,
	manufacturer: manufacturerReducer,
	material: materialReducer,
	cart: cartReducer,
	order: orderReducer
})
const store = configureStore({
	reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
