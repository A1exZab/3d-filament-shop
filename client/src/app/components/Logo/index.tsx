import * as S from './styles'

export function Logo(props: { size?: string }) {
	return (
		<S.Logo size={props.size} to='/'>
			3D
			<img src='/filament-logo.svg' />
			Plast
		</S.Logo>
	)
}
