import { useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from 'app/store/configureStore'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
