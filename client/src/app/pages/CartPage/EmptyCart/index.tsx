import * as C from 'app/styles/components'
import * as S from './styles'
import { HashLink as Link } from 'react-router-hash-link'

export function EmptyCart() {
	return (
		<C.HCWrapper>
			<S.EmptyCartTitle>
				Корзина пуста. Добавьте в корзину хотя бы один <Link to='/#catalog'>товар</Link>
			</S.EmptyCartTitle>
		</C.HCWrapper>
	)
}
