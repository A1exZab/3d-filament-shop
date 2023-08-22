import * as S from './styles'
import { Link, useParams } from 'react-router-dom'
import { BiCheckCircle, BiErrorCircle } from 'react-icons/bi'
import { OrderStatus } from 'app/types'

export function OrderStatusPage() {
	const { type } = useParams<{ type: string }>()

	return (
		<S.OrderStatusWrapper>
			<S.OrderStatusTitle success={type === OrderStatus.PROCESSED}>
				{type === OrderStatus.PROCESSED ? (
					<>
						<span>Заказ успешно оформлен</span>
						<BiCheckCircle />
					</>
				) : (
					<>
						<span>При оформлении заказа произошла ошибка</span>
						<BiErrorCircle />
					</>
				)}
			</S.OrderStatusTitle>
			{type === OrderStatus.PROCESSED ? (
				<Link to='/'>На главную →</Link>
			) : (
				<Link to='/cart'>Повторить ↺</Link>
			)}
		</S.OrderStatusWrapper>
	)
}
