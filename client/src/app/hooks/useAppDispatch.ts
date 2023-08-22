import { useDispatch } from 'react-redux'
import type { AppDispatch } from 'app/store/configureStore'

export const useAppDispatch: () => AppDispatch = useDispatch
