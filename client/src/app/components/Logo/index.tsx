import { ReactComponent as FilamentLogo } from 'app/assets/filament-logo.svg'
import * as S from './styles'

export function Logo(props: { size?: string }) {
	return (
		<S.Logo size={props.size} to='/'>
			3D
			<FilamentLogo />
			Plast
		</S.Logo>
	)
}
