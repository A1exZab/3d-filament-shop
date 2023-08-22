import { Logo } from 'app/components/Logo'
import * as S from './styles'
import * as C from 'app/styles/components'

export const Footer = () => {
	return (
		<S.Footer>
			<C.HWrapper>
				<S.FooterBlock>
					<Logo size='36px' />
					<span>© 2023</span>
				</S.FooterBlock>
				<S.FooterBlock>
					<span>Обратная связь</span>
					<S.FooterLink to={{ pathname: 'https://t.me/A1Zab' }} target='_blank'>
						Telegram
					</S.FooterLink>
					<S.FooterLink to={{ pathname: 'mailto:alexgol99@gmail.com' }} target='_blank'>
						Почта
					</S.FooterLink>
				</S.FooterBlock>
				<S.FooterBlock>
					<span>Частые вопросы</span>
					<S.FooterLink to='/delivery'>Доставка</S.FooterLink>
				</S.FooterBlock>
				<S.FooterBlock>
					<span>Доп. информация</span>
					<S.FooterLink to='/about'>О нас</S.FooterLink>
				</S.FooterBlock>
			</C.HWrapper>
		</S.Footer>
	)
}
