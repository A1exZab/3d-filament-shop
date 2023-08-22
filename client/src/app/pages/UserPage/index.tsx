import * as C from 'app/styles/components'
import * as S from './styles'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect } from 'react'
import { getCompletedOrders } from 'app/store/order'
import { CompletedOrderCard } from 'app/components/CompletedOrderCard'

export function UserPage() {
	const { user } = useAppSelector((state) => state.user)
	const { entities: orders } = useAppSelector((state) => state.order)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (user) {
			dispatch(getCompletedOrders(user.userId))
		}
	}, [])

	return (
		<C.VWrapper>
			<C.BoldTitle>Личный кабинет</C.BoldTitle>
			<S.UserBlock>
				<span>Информация о пользователе</span>
				<S.UserInfoField>
					<span>Пользователь:</span>
					{`${user?.firstName} ${user?.lastName}`}
				</S.UserInfoField>
				<S.UserInfoField>
					<span>Email:</span>
					<span>{user?.email}</span>
				</S.UserInfoField>
			</S.UserBlock>
			{orders && orders?.length > 0 && (
				<S.CompletedOrdersBlock>
					<span>Завершенные заказы</span>
					{orders.map((order) => (
						<CompletedOrderCard
							key={order._id}
							orderId={order._id}
							createdAt={order.createdAt}
							sum={order.sum}
						/>
					))}
				</S.CompletedOrdersBlock>
			)}
		</C.VWrapper>
	)
}
