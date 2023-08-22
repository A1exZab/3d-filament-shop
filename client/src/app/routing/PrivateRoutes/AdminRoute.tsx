import { useAppSelector } from 'app/hooks'
import { isAdmin } from 'app/store/user'
import { Route, Redirect, RouteProps } from 'react-router-dom'

export function AdminRoute({ component: Component, ...rest }: RouteProps) {
	const { isAuth } = useAppSelector((state) => state.user)
	const hasAdminRole = useAppSelector(isAdmin())

	if (!isAuth) {
		return (
			<Route
				{...rest}
				render={(props) => {
					return <Redirect to={{ pathname: '/auth/signin', state: { from: props.location } }} />
				}}
			/>
		)
	}

	return (
		<Route
			{...rest}
			render={(props) => {
				if (!hasAdminRole) {
					return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
				}

				return Component ? <Component {...props} /> : null
			}}
		/>
	)
}
