import * as S from './styles'
import { CartProductCard } from 'app/components/CartProductCard'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { getCurrentCart } from 'app/store/cart'
import * as C from 'app/styles/components'
import { useEffect } from 'react'
import { EmptyCart } from './EmptyCart'
import { Loader } from 'app/components/Loader'
import { OrderingForm } from './OrderingForm'
export function CartPage() {
	const cartProducts = useAppSelector((state) => state.cart.entities)
	const { isLoading } = useAppSelector((state) => state.cart)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getCurrentCart())
	}, [])

	if (isLoading) {
		return <Loader />
	}

	return (
		<C.VWrapper>
			<C.BoldTitle>Корзина</C.BoldTitle>
			{!cartProducts?.length ? (
				<EmptyCart />
			) : (
				<S.CartContentWrapper>
					<S.CartProducts>
						{cartProducts?.map((element) => (
							<CartProductCard
								key={element.productId}
								quantity={element.amount}
								productId={element.productId}
								orderElementId={element._id}
							/>
						))}
					</S.CartProducts>
					<OrderingForm />
				</S.CartContentWrapper>
			)}
		</C.VWrapper>
	)
}
