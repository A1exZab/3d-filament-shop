import { useEffect, useState } from 'react'
import * as S from './styles'
import { AiOutlinePlus } from 'react-icons/ai'
import { dataConverter } from 'app/utils/dateConverter'
import orderElementService from 'app/services/orderElement.service'
import { OrderElementResponse } from 'app/types'
import { CompletedOrderElement } from './CompletedOrderElement'

type CompletedOrderCardProps = {
	orderId: string
	createdAt: string
	sum: number
}

export function CompletedOrderCard({ orderId, createdAt, sum }: CompletedOrderCardProps) {
	const [opened, setOpened] = useState(false)
	const [elements, setElements] = useState<OrderElementResponse[]>()

	useEffect(() => {
		;(async () => {
			const data = await orderElementService.getByOrderId(orderId)
			setElements(data)
		})()
	}, [])

	return (
		<S.OrderCardWrapper opened={opened}>
			<AiOutlinePlus onClick={() => setOpened((prev) => !prev)} />
			<S.CompletedOrderTitle>{`Заказ №${orderId.slice(-6)} от ${dataConverter(
				createdAt
			)}`}</S.CompletedOrderTitle>
			<S.CompletedOrderInfo opened={opened}>
				<S.CompletedOrderInfoBlock>
					<span>Наименования</span>
					{elements &&
						elements.map((element) => (
							<CompletedOrderElement
								key={element._id}
								productId={element.productId}
								amount={element.amount}
							/>
						))}
				</S.CompletedOrderInfoBlock>
				<S.CompletedOrderInfoBlock>
					<span>Стоимость</span>
					<S.OrderTotalPrice>{sum} ₽</S.OrderTotalPrice>
				</S.CompletedOrderInfoBlock>
			</S.CompletedOrderInfo>
		</S.OrderCardWrapper>
	)
}
