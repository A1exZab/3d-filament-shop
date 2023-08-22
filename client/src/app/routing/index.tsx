import { Route, Switch, useHistory } from 'react-router-dom'
import { BaseLayout } from 'app/layouts/Base'
import { HomePage } from 'app/pages/HomePage'
import { AuthPage } from 'app/pages/AuthPage'
import { DeliveryPage } from 'app/pages/DeliveryPage'
import { AboutPage } from 'app/pages/AboutPage'
import { FullWindowLayout } from 'app/layouts/FullWindow'
import { ProductPage } from 'app/pages/ProductPage'
import { NotFoundPage } from 'app/pages/NotFoundPage'
import { UserPage } from 'app/pages/UserPage'
import { CartPage } from 'app/pages/CartPage'
import { UserRoute } from './PrivateRoutes/UserRoute'
import { AdminRoute } from './PrivateRoutes/AdminRoute'
import { AdminPage } from 'app/pages/AdminPage'
import { EditProductPage } from 'app/pages/EditProductPage'
import { CreateProductPage } from 'app/pages/CreateProductPage'
import { OrderStatusPage } from 'app/pages/OrderStatusPage/OrderStatusPage'

export const Routing = () => {
	const history = useHistory()
	return (
		<Switch>
			<Route
				path={['/', '/admin', '/delivery/', '/cart', '/orderStatus/:type?', '/user', '/about']}
				exact>
				<BaseLayout>
					<UserRoute path='/cart' component={CartPage} />
					<UserRoute path='/user' component={UserPage} />
					<UserRoute path='/orderStatus/:type?' component={OrderStatusPage} />
					<AdminRoute path='/admin' component={AdminPage} />
					<Route path='/delivery' component={DeliveryPage} />
					<Route path='/about' component={AboutPage} />
					<Route exact path='/' component={HomePage} />
				</BaseLayout>
			</Route>

			<Route path={['/auth/:type?']} exact>
				<FullWindowLayout onClose={() => history.push('/')}>
					<Route path='/auth/:type?' component={AuthPage} />
				</FullWindowLayout>
			</Route>

			<Route path={['/product/:productId?']} exact>
				<FullWindowLayout>
					<Route path='/product/:productId?' component={ProductPage} />
				</FullWindowLayout>
			</Route>

			<Route path={['/admin/edit/:productId?']} exact>
				<FullWindowLayout>
					<AdminRoute path='/admin/edit/:productId?' component={EditProductPage} />
				</FullWindowLayout>
			</Route>

			<Route path={['/admin/add']} exact>
				<FullWindowLayout>
					<AdminRoute path='/admin/add' component={CreateProductPage} />
				</FullWindowLayout>
			</Route>

			<Route>
				<BaseLayout>
					<NotFoundPage />
				</BaseLayout>
			</Route>
		</Switch>
	)
}
