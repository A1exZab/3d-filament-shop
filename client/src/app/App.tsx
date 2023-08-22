import { Routing } from 'app/routing'
import isPropValid from '@emotion/is-prop-valid'
import { StyleSheetManager } from 'styled-components'
import { useAppDispatch, useAppSelector } from './hooks'
import { useState, useEffect } from 'react'
import { checkAuth } from './store/user'
import { Loader } from './components/Loader'
import { getCurrentCart } from './store/cart'

function App() {
	const [authChecked, setAuthChecked] = useState(false)
	const { user } = useAppSelector((state) => state.user)
	const { isLoading } = useAppSelector((state) => state.user)

	const dispatch = useAppDispatch()

	useEffect(() => {
		if (localStorage.getItem('access')) {
			setAuthChecked(false)
			dispatch(checkAuth())
				.unwrap()
				.finally(() => setAuthChecked(true))
		} else {
			setAuthChecked(true)
		}
	}, [])

	useEffect(() => {
		if (user) {
			dispatch(getCurrentCart())
		}
	}, [user])

	if (!authChecked || isLoading) {
		return <Loader />
	}

	return (
		<StyleSheetManager shouldForwardProp={isPropValid}>
			<Routing />
		</StyleSheetManager>
	)
}

export default App
