import * as C from 'app/styles/components'
import * as S from './styles'

export function AboutPage() {
	return (
		<C.VWrapper>
			<C.BoldTitle>О нас</C.BoldTitle>
			<S.AboutBlock>
				<span>Приветствуем! </span>
				<span>Мы небольшой магазин по продаже пластика для 3D печати.</span>
				<span>Здесь вы сможете найти всё необходимое для реализации задуманных идей.</span>
				<span>По интересующим вас вопросам вы можете обратиться по указанным контактам.</span>
			</S.AboutBlock>
		</C.VWrapper>
	)
}
