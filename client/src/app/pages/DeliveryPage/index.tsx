import * as C from 'app/styles/components'
import * as S from './styles'
import { Link } from 'react-router-dom'

export function DeliveryPage() {
	return (
		<C.VWrapper>
			<C.BoldTitle>Доставка</C.BoldTitle>
			<S.DeliveryPlaces>
				<S.DeliveryBlock>
					<span>По РФ</span>
					<span>Почтой России — 390 ₽</span>
					<span>
						СДЭК* — индивидуально, воспользуйтесь{' '}
						<Link to={{ pathname: 'https://calc-cdek.ru/#calc' }} target='_blank'>
							калькулятором
						</Link>
					</span>
				</S.DeliveryBlock>
				<S.DeliveryBlock>
					<span>СНГ</span>
					<span>Почтой России — 1100 ₽</span>
				</S.DeliveryBlock>
				<span>
					*Осуществляется при полной предоплате, за доставку клиент расплачивается при получении
				</span>
			</S.DeliveryPlaces>
			<S.DeliveryTerms>
				<span>Сроки доставки</span>
				<span>В среднем — 7 дней</span>
				<span>Заказ формируется в течении одного дня, отправка занимает 3-5 дней.</span>
				<span>Посылка идет 3-5 дней после отправления, если это Почта России.</span>
				<span>СДЭК от 2х дней.</span>
			</S.DeliveryTerms>
		</C.VWrapper>
	)
}
