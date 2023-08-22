import * as S from './styles'

export interface ButtonProps {
	children: React.ReactNode | React.ReactNode[]
	onClick?: () => void
	size?: string
}

export function Button({ children, onClick, size }: ButtonProps) {
	return (
		<S.Button size={size} onClick={onClick}>
			{children}
		</S.Button>
	)
}
