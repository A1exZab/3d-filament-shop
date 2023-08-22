import * as C from 'app/styles/components'
import { Redirect, useParams } from 'react-router-dom'
import { RegisterForm } from 'app/components/RegisterForm'
import { LoginForm } from '../components/LoginForm'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect } from 'react'
import { resetAuthError } from 'app/store/user'

enum AuthType {
	SIGNUP = 'signup',
	SIGNIN = 'signin'
}

export function AuthPage() {
	const dispatch = useAppDispatch()
	const { isAuth } = useAppSelector((state) => state.user)
	const { authError } = useAppSelector((state) => state.user)
	const { type } = useParams<{ type: string }>()
	const SIGNUP_FORM_KEY = 'signup-form'
	const SIGNIN_FORM_KEY = 'signin-form'

	useEffect(() => {
		sessionStorage.removeItem(SIGNIN_FORM_KEY)
		sessionStorage.removeItem(SIGNUP_FORM_KEY)

		return () => {
			sessionStorage.removeItem(SIGNIN_FORM_KEY)
			sessionStorage.removeItem(SIGNUP_FORM_KEY)
		}
	}, [type])

	useEffect(() => {
		if (authError) {
			dispatch(resetAuthError())
		}
	}, [authError])

	if (isAuth) {
		return <Redirect to='/' />
	}

	return (
		<C.HCWrapper>
			{type === AuthType.SIGNIN ? (
				<LoginForm formKey={SIGNIN_FORM_KEY} />
			) : (
				<RegisterForm formKey={SIGNUP_FORM_KEY} />
			)}
		</C.HCWrapper>
	)
}
