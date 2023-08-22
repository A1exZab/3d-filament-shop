import { useAppSelector } from 'app/hooks'
import { Route, Redirect, RouteProps } from 'react-router-dom'

export function UserRoute({ component: Component, ...rest }: RouteProps) {
	const { isAuth } = useAppSelector((state) => state.user)

	return (
		<Route
			{...rest}
			render={(props) => {
				if (!isAuth) {
					return <Redirect to={{ pathname: '/auth/signin', state: { from: props.location } }} />
				}
				return Component ? <Component {...props} /> : null
			}}
		/>
	)
}
