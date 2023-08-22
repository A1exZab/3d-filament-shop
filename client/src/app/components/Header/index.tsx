import * as S from './styles'
import { BiBasket, BiUser, BiLogOut } from 'react-icons/bi'
import { Logo } from 'app/components/Logo'
import { isAdmin, signOut } from 'app/store/user'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useHistory } from 'react-router-dom'
import { getProductsAmount, resetCart } from 'app/store/cart'
import { resetOrders } from 'app/store/order'

export function Header() {
	const history = useHistory()
	const { isAuth } = useAppSelector((state) => state.user)
	const hasAdminRole = useAppSelector(isAdmin())
	const dispatch = useAppDispatch()
	const cartProductsAmount = useAppSelector(getProductsAmount())

	const signOutHandler = () => {
		const signoutConfirm = confirm('Вы действительно хотите выйти?')
		if (signoutConfirm) {
			dispatch(signOut())
				.unwrap()
				.then(() => dispatch(resetCart()))
				.then(() => dispatch(resetOrders()))
				.then(() => history.push('/'))
		}
	}

	return (
		<S.Header>
			<S.HeaderWrapper>
				<Logo size='24px' />
				<S.HeaderControls>
					{isAuth && hasAdminRole && <S.HeaderLink to='/admin'>Панель администратора</S.HeaderLink>}
					{!isAuth && <S.HeaderLink to='/auth/signin'>Авторизация/Регистрация</S.HeaderLink>}
					{isAuth && (
						<>
							<S.HeaderLink to='/cart' round={cartProductsAmount < 10}>
								<BiBasket /> Корзина {cartProductsAmount > 0 && <div>{cartProductsAmount}</div>}
							</S.HeaderLink>
							<S.HeaderLink to='/user' style={{ padding: '0 6px' }}>
								<BiUser />
							</S.HeaderLink>
							<S.HeaderButton onClick={signOutHandler}>
								<BiLogOut />
							</S.HeaderButton>
						</>
					)}
				</S.HeaderControls>
			</S.HeaderWrapper>
		</S.Header>
	)
}
